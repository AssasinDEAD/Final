const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const User = require("../users");

const Contract = sequelize.define("Contract", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  companyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  uniId: {
    type: DataTypes.UUID,
    allowNull: false, 
    references: { model: User, key: "id" },
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      "draft",
      "signedByUser",
      "signedByEmployer",
      "signedByUni",
      "completed"
    ),
    defaultValue: "draft",
  },
  sigexId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  studentSignId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companySignId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uniSignId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});


module.exports = Contract;
