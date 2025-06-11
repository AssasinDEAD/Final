const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

async function generateContractDocx(userData, outputPath) {
  const templatePath = path.join(__dirname, "..", "templates", "contract_template.docx");
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Шаблон договора не найден по пути ${templatePath}`);
  }

  const content = fs.readFileSync(templatePath, "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.setData(userData);

  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.error(JSON.stringify({ error: e }));
    throw error;
  }

  const buf = doc.getZip().generate({ type: "nodebuffer" });
  fs.writeFileSync(outputPath, buf);
}

module.exports = { generateContractDocx };
