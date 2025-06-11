const { DataTypes } = require("sequelize");
const db = require("../../config/db");
const User = require("../users");

const CompanyProfile = db.define("CompanyProfile", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
    },

    companyName: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    directorFullName: { type: DataTypes.STRING, allowNull: true },

    canProvideInternship: { type: DataTypes.BOOLEAN, defaultValue: false },

    BIN: { type: DataTypes.STRING, allowNull: true },
    BIK: { type: DataTypes.STRING, allowNull: true },
    KBE: { type: DataTypes.STRING, allowNull: true },
    BANK: { type: DataTypes.STRING, allowNull: true },
    
    representedBy: { type: DataTypes.STRING, allowNull: true },
    basis: { type: DataTypes.STRING, allowNull: true },

    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = CompanyProfile;
