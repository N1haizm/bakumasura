const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Blog = sequelize.define("Blog", {
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  title: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  altText: { type: DataTypes.STRING, allowNull: true },
  createdBy: { type: DataTypes.STRING, allowNull: true },
  createdOn: { type: DataTypes.DATE, allowNull: false },
  updatedBy: { type: DataTypes.STRING, allowNull: true },
  updatedOn: { type: DataTypes.DATE, allowNull: false },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = Blog;
