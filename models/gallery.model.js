const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Gallery = sequelize.define("Gallery", {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mainImg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
});

module.exports = Gallery;
