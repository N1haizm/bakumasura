// category.model.js (güncellenmiş)
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Category = sequelize.define("Category", {
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  altText: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.STRING, allowNull: false },
  createdOn: { type: DataTypes.DATE, allowNull: false },
  updatedBy: { type: DataTypes.STRING, allowNull: false },
  updatedOn: { type: DataTypes.DATE, allowNull: false },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: false,
});

module.exports = Category;
