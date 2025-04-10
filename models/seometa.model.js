const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const SeoMeta = sequelize.define("SeoMeta", {
  metaDescription: { type: DataTypes.STRING },
  metaTitle: { type: DataTypes.STRING },
  metaTags: { type: DataTypes.STRING },

  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

module.exports = SeoMeta;
