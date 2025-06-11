const { User, CompanyProfile } = require("../models");

exports.upsertCompanyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {companyName, address, phone, directorFullName, canProvideInternship, BIN, BIK, KBE, BANK, representedBy, basis, } = req.body;
        
        if (canProvideInternship) {
            if (!BIN || !BIK || !KBE || !BANK || !representedBy || !basis) {
                return res.status(400).json({
                message: "Если выбрана возможность предоставлять практику, необходимо заполнить все поля: BIN, BIK, KBE, BANK, representedBy, basis",
                });
            }
        }

        const [profile, created] = await CompanyProfile.upsert(
            {userId, companyName, address, phone, directorFullName, canProvideInternship, BIN, BIK, KBE, BANK, representedBy, basis, },
            { conflictFields: ['userId'], returning: true }
        );

        res.status(created ? 201 : 200).json({
            message: created ? "Профиль компании создан" : "Профиль компании обновлен",
            profile,
        });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

exports.getCompanyProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await CompanyProfile.findByPk(id, { include: User });

        if (!profile) {
            return res.status(404).json({ message: "Профиль компании не найден" });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

exports.getMyCompanyProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: "Ошибка: пользователь не найден в req.user" });
        }

        const profile = await CompanyProfile.findOne({ where: { userId } });

        if (!profile) {
            return res.status(404).json({ message: "Профиль компании не найден" });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};

exports.getAvailableCompanies = async (req, res) => {
  try {
    const companies = await CompanyProfile.findAll({
      where: { canProvideInternship: true },
      include: {
        model: User,
        attributes: ["id", "name", "email"],
        where: { role: "company" },
      },
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера", error });
  }
};

exports.getAllCompanyProfiles = async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: "company" },
            attributes: ["id", "email", "role", "name"],
            include: [
                {
                    model: CompanyProfile,
                    required: false, 
                },
            ],
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};

exports.deleteCompanyProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const profile = await CompanyProfile.findOne({ where: { id, userId } });

        if (!profile) {
            return res.status(404).json({ message: "Профиль не найден или у вас нет доступа" });
        }

        await profile.destroy();
        res.json({ message: "Профиль удален" });
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера", error });
    }
};
