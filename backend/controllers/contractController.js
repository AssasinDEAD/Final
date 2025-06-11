const fs = require("fs");
const os = require("os");
const path = require("path");
const archiver = require("archiver");
const axios = require("axios");
const { generateContractDocx } = require("../utils/docGenerator");
const SIGEX_URL = "https://sigex.kz";
const { User, Contract } = require("../models"); 
const { Op } = require("sequelize");
const { createSignedPDFWithQRs } = require("../utils/signWithQR");

function getNextStatus(currentStatus, role) {
  if (currentStatus === "draft" && role === "student") return "signedByUser";
  if (currentStatus === "signedByUser" && role === "employer") return "signedByEmployer";
  if (currentStatus === "signedByEmployer" && role === "career_center") return "signedByProvost";
  if (currentStatus === "signedByCC") return "completed";
  return null;
}

const signingOrder = {
  draft: "student",
  signedByUser: "company",
  signedByEmployer: "career_center",
  signedByCC: null, 
};

exports.createContract = async (req, res) => {
  const { userData, companyId } = req.body;
  const studentId = req.user.id;

  if (!userData || !companyId) {
    return res.status(400).json({ error: "Нужно передать userData и companyId" });
  }
  const company = await User.findByPk(companyId);
  if (!company) {
    return res.status(404).json({ error: "Компания не найдена" });
  }

  const baseName = `contract_${Date.now()}`;
  const docxFilename = `${baseName}.docx`;
  const docxPath = path.join(__dirname, "..", "uploads/contracts", docxFilename);
  const relativePath = `/uploads/contracts/${docxFilename}`;

  try {
    const provost = await User.findOne({
      where: { email: "provost.office@narxoz.kz" },
    });

    if (!provost) {
      return res.status(404).json({ error: "Провост не найден!" });
    }

    const uniId = provost.id;

    const contract = await Contract.create({
      studentId,
      companyId,
      uniId,
      filePath: relativePath,
      status: "draft",
    });

    try {
      await generateContractDocx(userData, docxPath);
      return res.status(201).json(contract);
    } catch (fileErr) {
      console.error("Ошибка при генерации файла:", fileErr.message);
      await contract.destroy();
      return res.status(500).json({ error: "Ошибка при генерации DOCX-файла" });
    }
  } catch (err) {
    console.error("Ошибка создания договора:", err.message);
    return res.status(500).json({ error: "Ошибка при создании договора" });
  }
};

exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      where: {
        [Op.or]: [
          { studentId: req.user.id },
          { companyId: req.user.id },
          { uniId: req.user.id },
        ],
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(contracts);
  } catch (err) {
    console.error("Error fetching contracts:", err);
    res.status(500).json({ error: "Ошибка при получении договоров" });
  }
};

exports.getContractById = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findByPk(id);
    if (
      !contract ||
      (contract.studentId !== req.user.id &&
        contract.companyId !== req.user.id &&
        contract.uniId !== req.user.id)
    ) {
      return res.status(404).json({ error: "Договор не найден или нет доступа" });
    }

    res.json(contract);
  } catch (err) {
    console.error("Error fetching contract by ID:", err);
    res.status(500).json({ error: "Ошибка при получении договора" });
  }
};

exports.deleteContract = async (req, res) => {
  const { id } = req.params;
  try {
    const contract = await Contract.findByPk(id);

    if (!contract || contract.studentId !== req.user.id) {
      return res.status(403).json({ error: "Удаление разрешено только студенту-владельцу" });
    }

    const fullPath = path.join(__dirname, "..", contract.filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlink(fullPath, (err) => {
        if (err) console.warn("Failed to delete file:", err.message);
      });
    }

    await contract.destroy();
    res.json({ message: "Договор удалён" });
  } catch (err) {
    console.error("Error deleting contract:", err);
    res.status(500).json({ error: "Ошибка при удалении договора" });
  }
};

exports.downloadContractFile = async (req, res) => {
  const { id } = req.params;

  try {
    const contract = await Contract.findByPk(id);
    if (
      !contract ||
      (contract.studentId !== req.user.id &&
        contract.companyId !== req.user.id &&
        contract.uniId !== req.user.id)
    ) {
      return res.status(404).json({ error: "Нет доступа или договор не найден" });
    }

    const originalPath = path.join(__dirname, "..", contract.filePath);
    if (!fs.existsSync(originalPath)) {
      return res.status(404).json({ error: "Оригинальный файл не найден" });
    }

    const roles = [
      { key: "studentSignId", label: "Подпись студента:" },
      { key: "companySignId", label: "Подпись компании:" },
      { key: "uniSignId", label: "Подпись провоста:" },
    ];

    const qrBuffers = [];
    const labels = [];

    for (const { key, label } of roles) {
      const signId = contract[key];
      if (!signId || !contract.sigexId) continue;

      try {
        const qrRes = await axios.get(
          `${SIGEX_URL}/api/${contract.sigexId}/signature/${signId}/qr?signFormat=0&qrVersion=25&qrLevel=M`
        );
        const qrCodes = qrRes.data.qrCodes || [];
        for (const base64 of qrCodes) {
          try {
            const buffer = Buffer.from(base64, "base64");
            qrBuffers.push(buffer);
            labels.push(label);
          } catch (e) {
            console.error("Ошибка при декодировании QR:", e.message);
          }
        }
      } catch (e) {
        console.error("Ошибка при получении QR-кода:", e.message);
      }
    }

    const signedPdfPath = path.join(os.tmpdir(), `contract_signed_${id}.pdf`);
    try {
      await createSignedPDFWithQRs(qrBuffers, labels, signedPdfPath);
    } catch (e) {
      console.error("Ошибка при вставке QR в PDF:", e.message);
      return res.status(500).json({ error: "Ошибка вставки QR в PDF" });
    }

    if (!fs.existsSync(signedPdfPath)) {
      return res.status(500).json({ error: "Файл с подписями не создан" });
    }

    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="contract_${id}.zip"`,
    });

    const archive = archiver("zip");
    archive.pipe(res);

    archive.file(originalPath, { name: "original.docx" });
    archive.file(signedPdfPath, { name: "signed_with_qr.pdf" });

    await archive.finalize();

    archive.on("end", () => {
      fs.unlink(signedPdfPath, () => {});
    });
  } catch (err) {
    console.error("Ошибка при загрузке договора:", err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: "Ошибка при формировании архива" });
    }
  }
};

exports.signContract = async (req, res) => {
  const { id } = req.params;
  const { signature } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).json({ error: "Договор не найден" });
    }

    if (
      (userRole === "student" && contract.studentId !== userId) ||
      (userRole === "company" && contract.companyId !== userId) ||
      (userRole === "career_center" && contract.uniId !== userId) ||
      (userRole !== "student" && userRole !== "company" && userRole !== "career_center" )
    ) {
      return res.status(403).json({ error: "Нет доступа к подписанию" });
    }

    const filePath = path.join(__dirname, "..", contract.filePath);

    const expectedRole = signingOrder[contract.status];
    if (userRole !== expectedRole) {
      return res.status(400).json({ error: `Сейчас подписывать должен ${expectedRole}` });
    }

    const signIdField = {
      student: "studentSignId",
      company: "companySignId",
      career_center: "uniSignId",
    }[userRole];

    if (!contract.sigexId) {
      const registerRes = await axios.post(`${SIGEX_URL}/api`, {
        title: path.basename(contract.filePath),
        description: "Подписание договора",
        signType: "cms",
        signature,
        emailNotifications: null,
        settings: {},
      });

      contract.sigexId = registerRes.data.documentId || registerRes.data.id;
      await contract.save();

      const fileStream = fs.createReadStream(filePath);
      const fileStat = fs.statSync(filePath);

      await axios.post(`${SIGEX_URL}/api/${contract.sigexId}/data`, fileStream, {
        headers: {
          "Content-Type": "application/octet-stream",
          "Content-Length": fileStat.size,
        },
      });
    }

    if (!contract[signIdField]) {
     
      const signRes = await axios.post(`${SIGEX_URL}/api/${contract.sigexId}`, { signature });
      const signId = signRes.data.signId || signRes.data.id;
      if (!signId) {
              
        return res.status(500).json({ error: "SIGEX не вернул signId" });
      }

      contract[signIdField] = signId;
      await contract.save();
    }

    const newStatus = getNextStatus(contract.status, userRole);
    if (newStatus) {
      contract.status = newStatus;
      await contract.save();
    }

    res.json(contract);
  } catch (err) {
    console.error("Ошибка при подписании:", err.message);
    res.status(500).json({ error: "Ошибка при подписании договора" });
  }
};
