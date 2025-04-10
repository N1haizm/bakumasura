const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Product = sequelize.define("Product", {
  imageUrl: { type: DataTypes.STRING, allowNull: true},
  price: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  altText: { type: DataTypes.STRING, allowNull: false },
  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false,
});

module.exports = Product;
