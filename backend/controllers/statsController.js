const { User, Vacancy, VacancyResponse, Notification } = require("../models");

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const companies = await User.count({ where: { role: "company" } });
    const students = await User.count({ where: { role: "student" } });
    const careerCenters = await User.count({ where: { role: "career_center" } });
    const admins = await User.count({ where: { role: "admin" } });

    const totalNotifications = await Notification.count();
    const totalVacancies = await Vacancy.count();
    const totalResponses = await VacancyResponse.count();
    const accepted = await VacancyResponse.count({ where: { status: "accepted" } });
    const pending = await VacancyResponse.count({ where: { status: "pending" } });
    const rejected = await VacancyResponse.count({ where: { status: "rejected" } });

    return res.json({
      users: {
        total: totalUsers,
        companies,
        students,
        careerCenters,
        admins,
      },
      notifications: totalNotifications,
      vacancies: totalVacancies,
      responses: {
        total: totalResponses,
        accepted,
        pending,
        rejected,
      },
    });
  } catch (error) {
    console.error("Ошибка при получении статистики:", error.message);
    return res.status(500).json({ message: "Ошибка сервера", error: error.message });
  }
};
