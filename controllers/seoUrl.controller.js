const { SeoUrl } = require("../models");

const seoUrlController = {
  getAll: async (req, res) => {
    try {
      const data = await SeoUrl.findAll();
      res.status(200).json({ message: "success", data });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const seoUrl = await SeoUrl.findByPk(id);
      if (!seoUrl) return res.status(404).json({ message: "not found" });
      res.status(200).json({ message: "success", data: seoUrl });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const data = req.body;
      data.createdOn = new Date();
      data.updatedOn = new Date();
      const newSeoUrl = await SeoUrl.create(data);
      res.status(201).json({ message: "created", data: newSeoUrl });
    } catch (err) {
      res.status(400).json({ message: "validation error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const seoUrl = await SeoUrl.findByPk(id);
      if (!seoUrl) return res.status(404).json({ message: "not found" });

      const data = req.body;
      data.updatedOn = new Date();

      await seoUrl.update(data);
      res.status(200).json({ message: "updated", data: seoUrl });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const seoUrl = await SeoUrl.findByPk(id);
      if (!seoUrl) return res.status(404).json({ message: "not found" });

      await seoUrl.destroy();
      res.status(200).json({ message: "deleted", data: seoUrl });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
};

module.exports = seoUrlController;
