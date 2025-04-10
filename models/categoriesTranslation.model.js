const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");
const Category = require("./categories.model");

const CategoryTranslation = sequelize.define("CategoryTranslation", {
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdOn: {
    type: DataTypes.DATE,
  },
  updatedOn: {
    type: DataTypes.DATE,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
});

Category.hasMany(CategoryTranslation, {
  foreignKey: "entityId",
  as: "translations",
  onDelete: "CASCADE",
});

CategoryTranslation.belongsTo(Category, {
  foreignKey: "entityId",
});

module.exports = CategoryTranslation;
