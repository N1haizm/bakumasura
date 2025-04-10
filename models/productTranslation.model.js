const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");
const Product = require("./product.model");

const Translation = sequelize.define("ProductTranslation", {
  entityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: "id"
    }
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: { type: DataTypes.STRING },
  createdOn: { type: DataTypes.DATE },
  updatedBy: { type: DataTypes.STRING },
  updatedOn: { type: DataTypes.DATE },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
});

Product.hasMany(Translation, { foreignKey: "entityId", as: "translations" });
Translation.belongsTo(Product, { foreignKey: "entityId", as: "product" });

module.exports = Translation;
