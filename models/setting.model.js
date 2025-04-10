const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Setting = sequelize.define("Setting", {
  key: { type: DataTypes.STRING },
  value: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
  valueText: { type: DataTypes.STRING },
  altText: { type: DataTypes.STRING },
  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = Setting;
