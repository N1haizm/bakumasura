const Sequelize = require("sequelize");
const sequelize = require("../config/dbconnect");

// Modelleri içe aktar
const Category = require("./categories.model");
const CategoryTranslation = require("./categoriesTranslation.model");
const Product = require("./product.model");
const ProductTranslation = require("./productTranslation.model");
const Setting = require("./setting.model");
const SettingTranslation = require("./settingTranslation.model");
const Gallery = require("./gallery.model");
const Slide = require("./slide.model");
const Blog = require("./blog.model");
const SeoMeta = require("./seometa.model");
const SeoUrl = require("./seourl.model");
const SeoData = require("./seodata.model");
// Category - CategoryTranslation
Category.hasMany(CategoryTranslation, {
  foreignKey: "entityId",
  as: "categoryTranslations",
  onDelete: "CASCADE",
});
CategoryTranslation.belongsTo(Category, {
  foreignKey: "entityId",
  as: "parentCategory",
});

// Category - Product
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "CASCADE",
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "parentCategoryOfProduct",
});

// Product - ProductTranslation
Product.hasMany(ProductTranslation, {
  foreignKey: "entityId",
  as: "productTranslations",
  onDelete: "CASCADE",
});
ProductTranslation.belongsTo(Product, {
  foreignKey: "entityId",
  as: "parentProduct",
});

// Setting - SettingTranslation
Setting.hasMany(SettingTranslation, {
  foreignKey: "entityId",
  as: "settingTranslations",
  onDelete: "CASCADE",
});
SettingTranslation.belongsTo(Setting, {
  foreignKey: "entityId",
  as: "parentSetting",
});

// DB Sync
sequelize.sync({ alter: true })
  .then(() => console.log("✅ DB & tables synced"))
  .catch((err) => console.error("❌ Sync error:", err));

module.exports = {
  sequelize,
  Sequelize,
  Category,
  CategoryTranslation,
  Product,
  ProductTranslation,
  Setting,
  SettingTranslation,
  Gallery,
  Slide,
  Blog,
  SeoMeta,
  SeoUrl,
  SeoData,
};
