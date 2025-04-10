const productModel = require("../models/product.model");
const productTranslation = require("../models/productTranslation.model");
const fs = require("fs");
const path = require("path");
const { getValidLanguage } = require("../constants/language");



const product_controller = {
  getAll: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);

      console.log(lang);
      const products = await productModel.findAll({
        include: [
          {
            model: productTranslation,
            as: "translations",
            where: { language: lang },
            required: false
          }
        ]
      });
      res.status(200).json({ message: "success", data: products });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);
      const product = await productModel.findByPk(req.params.id, {
        include: [
          {
            model: productTranslation,
            as: "translations",
            where: { language: lang },
            required: false
          }
        ]
      });

      if (!product) return res.status(404).json({ message: "not found" });

      res.status(200).json({ message: "success", data: product });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const { translations = [], ...data } = req.body;
      const now = new Date();
      data.createdOn = now;
      data.updatedOn = now;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      data.imageUrl = req.file.filename;

      let product;
      try {
        product = await productModel.create(data);
      } catch (createErr) {
        const filePath = path.join(__dirname, "../uploads/product", data.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Validation error", error: createErr.message });
      }

      for (const t of JSON.parse(translations)) {
        await productTranslation.create({ ...t, entityId: product.id });
      }

      res.status(201).json({ message: "created", data: product });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { translations = [], ...data } = req.body;
      const product = await productModel.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "not found" });

      if (req.file) {
        if (product.imageUrl) {
          const oldImagePath = path.join(__dirname, "../uploads/product", product.imageUrl);
          if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        data.imageUrl = req.file.filename;
      }

      data.updatedOn = new Date();
      await product.update(data);

      for (const t of JSON.parse(translations)) {
        const existing = await productTranslation.findOne({
          where: { entityId: req.params.id, language: t.language }
        });

        if (existing) {
          await existing.update(t);
        } else {
          await productTranslation.create({ ...t, entityId: req.params.id });
        }
      }

      res.status(200).json({ message: "updated", data: product });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const product = await productModel.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "not found" });

      if (product.imageUrl) {
        const imagePath = path.join(__dirname, "../uploads/product", product.imageUrl);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }

      await product.destroy();
      await productTranslation.destroy({ where: { entityId: req.params.id } });

      res.status(200).json({ message: "deleted", data: product });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  }
};

module.exports = product_controller;
