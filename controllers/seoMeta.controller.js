const { SeoMeta } = require("../models");

const seoMetaController = {
  getAll: async (req, res) => {
    try {
      const data = await SeoMeta.findAll();
      res.status(200).json({ message: "success", data });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const seoMeta = await SeoMeta.findByPk(id);
      if (!seoMeta) return res.status(404).json({ message: "not found" });
      res.status(200).json({ message: "success", data: seoMeta });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const data = req.body;
      data.createdOn = new Date();
      data.updatedOn = new Date();
      const newSeoMeta = await SeoMeta.create(data);
      res.status(201).json({ message: "created", data: newSeoMeta });
    } catch (err) {
      res.status(400).json({ message: "validation error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const seoMeta = await SeoMeta.findByPk(id);
      if (!seoMeta) return res.status(404).json({ message: "not found" });

      const data = req.body;
      data.updatedOn = new Date();

      await seoMeta.update(data);
      res.status(200).json({ message: "updated", data: seoMeta });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const seoMeta = await SeoMeta.findByPk(id);
      if (!seoMeta) return res.status(404).json({ message: "not found" });

      await seoMeta.destroy();
      res.status(200).json({ message: "deleted", data: seoMeta });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },
};

module.exports = seoMetaController;
