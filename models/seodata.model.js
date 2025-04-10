const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const SeoData = sequelize.define("SeoData", {
  altText: { type: DataTypes.STRING, allowNull: false },
  anchorText: { type: DataTypes.STRING, allowNull: false },

  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = SeoData;
