const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Slide = sequelize.define("slide", {
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  altText: { type: DataTypes.STRING },

  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = Slide;
