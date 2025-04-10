const Category = require("../models/categories.model");
const CategoryTranslation = require("../models/categoriesTranslation.model");
const fs = require("fs");
const path = require("path");
const { getValidLanguage } = require("../constants/language");



const category_controller = {
  getAll: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);
      const categories = await Category.findAll({
        include: [
          {
            model: CategoryTranslation,
            as: "translations",
            where: { language: lang },
            required: false,
          },
        ],
      });
      res.status(200).json({ message: "success", data: categories });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);
      const category = await Category.findByPk(req.params.id, {
        include: [
          {
            model: CategoryTranslation,
            as: "translations",
            where: { language: lang },
            required: false,
          },
        ],
      });
      if (!category) return res.status(404).json({ message: "not found" });
      res.status(200).json({ message: "success", data: category });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    let category;
    try {
      let { translations = [], ...data } = req.body;
      if (typeof translations === "string") {
        translations = JSON.parse(translations);
      }
  
      const now = new Date();
      data.createdOn = now;
      data.updatedOn = now;
  
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }
  

      const uploadedImage = req.file.filename;
  
      data.imageUrl = uploadedImage;
  
      try {
        category = await Category.create(data);
      } catch (createErr) {
      
        const tempPath = path.join(__dirname, "../uploads/categories", uploadedImage);
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
          console.log("Dosya silindi çünkü kayıt başarısız:", tempPath);
        }
        return res.status(400).json({ message: "Validation failed", error: createErr.message });
      }
  
      for (const t of translations) {
        await CategoryTranslation.create({
          ...t,
          entityId: category.id,
          createdOn: now,
          updatedOn: now,
          isDeleted: false,
        });
      }
  
      const result = await Category.findByPk(category.id, {
        include: [{ model: CategoryTranslation, as: "translations" }],
      });
  
      res.status(201).json({ message: "created", data: result });
    } catch (err) {
      console.error("Post hatası:", err.message);
  
     
      if (req.file) {
        const fallbackPath = path.join(__dirname, "../uploads/categories", req.file.filename);
        if (fs.existsSync(fallbackPath)) fs.unlinkSync(fallbackPath);
      }
  
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
  

  update: async (req, res) => {
    try {
      let { translations = [], ...data } = req.body;
      if (typeof translations === "string") {
        translations = JSON.parse(translations);
      }

      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ message: "not found" });

      const now = new Date();
      data.updatedOn = now;

      if (req.file) {
        const newImage = req.file.filename;
        const oldImage = category.imageUrl;

        if (oldImage) {
          const oldPath = path.join(__dirname, "../uploads/categories", oldImage);
          try {
            if (fs.existsSync(oldPath)) {
              fs.unlinkSync(oldPath);
              console.log("Old image deleted:", oldPath);
            }
          } catch (unlinkErr) {
            return res.status(500).json({ message: "Image deletion error", error: unlinkErr.message });
          }
        }

        data.imageUrl = newImage;
      }

      await category.update(data);

      for (const t of translations) {
        if (t.id) {
          const existing = await CategoryTranslation.findByPk(t.id);
          if (existing) {
            await existing.update({ ...t, updatedOn: now });
          }
        } else {
          await CategoryTranslation.create({
            ...t,
            entityId: req.params.id,
            createdOn: now,
            updatedOn: now,
            isDeleted: false,
          });
        }
      }

      const result = await Category.findByPk(req.params.id, {
        include: [{ model: CategoryTranslation, as: "translations" }],
      });

      res.status(200).json({ message: "updated", data: result });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ message: "not found" });

      if (category.imageUrl) {
        const imgPath = path.join(__dirname, "../uploads/categories", category.imageUrl);
        if (fs.existsSync(imgPath)) {
          try {
            fs.unlinkSync(imgPath);
          } catch (err) {
            console.error("Image deletion failed:", err.message);
          }
        }
      }

      await category.destroy();
      await CategoryTranslation.destroy({ where: { entityId: req.params.id } });

      res.status(200).json({ message: "deleted", data: category });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
};

module.exports = category_controller;
