const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const TranslationSetting = sequelize.define("TranslationSetting", {
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  language: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = TranslationSetting;
