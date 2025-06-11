const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { sendEmail } = require("../utils/email");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "name", "email", "role", "createdAt"],
            order: [["createdAt", "DESC"]],
        });
        res.json(users);
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error.message);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, notifyUser } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Необходимо заполнить все поля" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        if (notifyUser) {
            try {
                await sendEmail({
                    to: email,
                    subject: "Ваш аккаунт создан администратором LegacyLink!",
                    text: `Здравствуйте!\nРады сообщить вам, что администратор LegacyLink успешно создал ваш аккаунт.\nВаши данные для входа в систему:\n🔹 Логин: ${email}\n🔹 Пароль: ${password}\nПожалуйста, сохраните эти данные в надежном месте. Если у вас возникнут вопросы, не стесняйтесь обращаться к нам.\nС уважением, команда LegacyLink.`,
                });
            } catch (emailError) {
                console.error("Ошибка при отправке email:", emailError);
                return res.status(500).json({ message: "Ошибка при отправке email" });
            }
        }

        res.status(201).json({ message: "Пользователь создан", user: newUser });
    } catch (error) {
        console.error("Ошибка при создании пользователя:", error.message);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = user.role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ message: "Пользователь обновлен", user });
    } catch (error) {
        console.error("Ошибка при обновлении пользователя:", error.message);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const photoPath = req.file ? `/uploads/users/${req.file.filename}` : null;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (currentPassword || newPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({
          message: "Для смены пароля необходимо заполнить все три поля: текущий, новый и подтверждение.",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неверный текущий пароль" });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Новый пароль и подтверждение не совпадают" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    if (photoPath) {
      user.photo = photoPath;
    }

    await user.save();
    res.json({ message: "Профиль успешно обновлён" });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "Пользователь не найден" });

        await user.destroy();
        res.json({ message: "Пользователь удален" });
    } catch (error) {
        console.error("Ошибка при удалении пользователя:", error.message);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};