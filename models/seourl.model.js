const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const SeoUrl = sequelize.define("SeoUrl", {
  url: { type: DataTypes.STRING },
  redirectUrl: { type: DataTypes.STRING },

  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = SeoUrl;
