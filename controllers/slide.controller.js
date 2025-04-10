const Slide = require("../models/slide.model");
const fs = require("fs");
const path = require("path");

const slide_controller = {
  getAll: async (req, res) => {
    try {
      const slides = await Slide.findAll();
      res.status(200).json({ message: "success", data: slides });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const slide = await Slide.findByPk(req.params.id);
      if (!slide) return res.status(404).json({ message: "not found" });
      res.status(200).json({ message: "success", data: slide });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    let slide;
    try {
      const { altText, createdBy, updatedBy } = req.body;
      const now = new Date();

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const slideData = {
        altText,
        createdBy,
        updatedBy,
        createdOn: now,
        updatedOn: now,
        isDeleted: false,
        imageUrl: req.file.filename,
      };

      try {
        slide = await Slide.create(slideData);
      } catch (createErr) {
        const filePath = path.join(__dirname, "../uploads/slide", slideData.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Validation error", error: createErr.message });
      }

      res.status(201).json({ message: "created", data: slide });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const slide = await Slide.findByPk(req.params.id);
      if (!slide) return res.status(404).json({ message: "not found" });

      const { altText, updatedBy } = req.body;
      const updatedOn = new Date();
      const updateData = { altText, updatedBy, updatedOn };

      if (req.file) {
        if (slide.imageUrl) {
          const oldPath = path.join(__dirname, "../uploads/slide", slide.imageUrl);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        updateData.imageUrl = req.file.filename;
      }

      await slide.update(updateData);

      res.status(200).json({ message: "updated", data: slide });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const slide = await Slide.findByPk(req.params.id);
      if (!slide) return res.status(404).json({ message: "not found" });

      if (slide.imageUrl) {
        const filePath = path.join(__dirname, "../uploads/slide", slide.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await slide.destroy();

      res.status(200).json({ message: "deleted", data: slide });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
};

module.exports = slide_controller;
