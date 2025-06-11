const db = require("../config/db");

const User = require("./users");
const Vacancy = require("./com/vacancy");
const Resume = require("./student/resume");
const Notification = require("./cc/notification");
const VacancyResponse = require("./student/vacancyResponse");
const Contract = require("./student/contract");
const CompanyProfile = require("./com/profile");

// User ↔ Vacancy
User.hasMany(Vacancy, { foreignKey: "userId", onDelete: "CASCADE" });
Vacancy.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// User ↔ Resume (1:1)
User.hasOne(Resume, { foreignKey: "userId", onDelete: "CASCADE" });
Resume.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// User ↔ VacancyResponse (1:M)
User.hasMany(VacancyResponse, { foreignKey: "userId", onDelete: "CASCADE" });
VacancyResponse.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// Vacancy ↔ VacancyResponse (1:M)
Vacancy.hasMany(VacancyResponse, { foreignKey: "vacancyId", onDelete: "CASCADE" });
VacancyResponse.belongsTo(Vacancy, { foreignKey: "vacancyId", onDelete: "CASCADE" });

// User ↔ CompanyProfile (1:1)
User.hasOne(CompanyProfile, { foreignKey: "userId", onDelete: "CASCADE" });
CompanyProfile.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = {
  db,
  User,
  Vacancy,
  Resume,
  Notification,
  VacancyResponse,
  Contract,
  CompanyProfile,
};

