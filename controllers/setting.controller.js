const { Setting, SettingTranslation } = require("../models");
const fs = require("fs");
const path = require("path");
const { getValidLanguage } = require("../constants/language");
const setting_controller = {
  getAll: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);
      const settings = await Setting.findAll({
        include: [
          {
            model: SettingTranslation,
            as: "settingTranslations",
            where: { language: lang },
            required: false,
          },
        ],
      });
      res.status(200).json({ message: "success", data: settings });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const lang = getValidLanguage(req.headers["accept-language"]);
      const setting = await Setting.findByPk(req.params.id, {
        include: [
          {
            model: SettingTranslation,
            as: "settingTranslations",
            where: { language: lang },
            required: false,
          },
        ],
      });
      if (!setting) return res.status(404).json({ message: "not found" });
      res.status(200).json({ message: "success", data: setting });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
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

      data.imageUrl = req.file.filename;

      let setting;
      try {
        setting = await Setting.create(data);
      } catch (createErr) {
        const filePath = path.join(__dirname, "../uploads/setting", data.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Validation error", error: createErr.message });
      }

      for (const t of translations) {
        await SettingTranslation.create({
          ...t,
          entityId: setting.id,
          createdOn: now,
          updatedOn: now,
          isDeleted: false,
        });
      }

      const result = await Setting.findByPk(setting.id, {
        include: [{ model: SettingTranslation, as: "settingTranslations" }],
      });

      res.status(201).json({ message: "created", data: result });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      let { translations = [], ...data } = req.body;
      if (typeof translations === "string") {
        translations = JSON.parse(translations);
      }

      const setting = await Setting.findByPk(req.params.id);
      if (!setting) return res.status(404).json({ message: "not found" });

      const now = new Date();
      data.updatedOn = now;

      if (req.file) {
        const oldImagePath = path.join(__dirname, "../uploads/setting", setting.imageUrl);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Eski dosya silindi:", oldImagePath);
          }
        } catch (unlinkErr) {
          return res.status(500).json({
            message: "Old image could not be deleted",
            error: unlinkErr.message,
          });
        }

        data.imageUrl = req.file.filename;
      }

      await setting.update(data);

      for (const t of translations) {
        if (t.id) {
          const existing = await SettingTranslation.findByPk(t.id);
          if (existing) {
            await existing.update({ ...t, updatedOn: now });
          }
        } else {
          await SettingTranslation.create({
            ...t,
            entityId: req.params.id,
            createdOn: now,
            updatedOn: now,
            isDeleted: false,
          });
        }
      }

      const result = await Setting.findByPk(req.params.id, {
        include: [{ model: SettingTranslation, as: "settingTranslations" }],
      });

      res.status(200).json({ message: "updated", data: result });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const setting = await Setting.findByPk(req.params.id);
      if (!setting) return res.status(404).json({ message: "not found" });

      if (setting.imageUrl) {
        const filePath = path.join(__dirname, "../uploads/setting", setting.imageUrl);
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (err) {
          console.error("Eski görsel silinemedi:", err.message);
        }
      }

      await setting.destroy();
      await SettingTranslation.destroy({ where: { entityId: req.params.id } });

      res.status(200).json({ message: "deleted", data: setting });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
};

module.exports = setting_controller;
