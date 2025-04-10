const galleryModel = require("../models/gallery.model");
const path = require("path");
const fs = require("fs");

const gallery_controller = {
  getAll: async (req, res) => {
    try {
      const galleries = await galleryModel.findAll();
      res.status(200).json({ message: "success", data: galleries });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const gallery = await galleryModel.findByPk(req.params.id);
      if (!gallery) {
        return res.status(404).json({ message: "Gallery not found" });
      }
      res.status(200).json({ message: "success", data: gallery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const gallery = await galleryModel.findByPk(req.params.id);
      if (!gallery) return res.status(404).json({ message: "Gallery not found" });

      // Ana görseli sil
      if (gallery.mainImg) {
        const mainImgPath = path.join(__dirname, "../uploads/gallery", gallery.mainImg);
        if (fs.existsSync(mainImgPath)) fs.unlinkSync(mainImgPath);
      }

      // Çoklu görselleri sil
      if (gallery.imageUrl) {
        gallery.imageUrl.split(',').forEach(image => {
          const filePath = path.join(__dirname, "../uploads/gallery", image);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
      }

      await gallery.destroy();
      res.status(200).json({ message: "Gallery deleted", data: gallery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const gallery = await galleryModel.findByPk(req.params.id);
      if (!gallery) return res.status(404).json({ message: "Gallery not found" });
  
      const data = req.body;
      const type = data.type === "true" || data.type === true;
  
      // === Görsel güncelleme (type === true) ===
      if (type) {
        if (!req.files?.images?.length && !gallery.imageUrl) {
          return res.status(400).json({ message: "Image(s) are required for type=true" });
        }
        if (data.linkUrl) {
          return res.status(400).json({ message: "linkUrl should not be provided when type=true" });
        }
  
        if (req.files?.images?.length > 0) {
          if (gallery.imageUrl) {
            gallery.imageUrl.split(',').forEach(img => {
              const filePath = path.join(__dirname, "../uploads/gallery", img);
              if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            });
          }
          data.imageUrl = req.files.images.map(f => f.filename).join(',');
        }
      }
  
      // === Link güncelleme (type === false) ===
      if (!type) {
        if (!data.linkUrl) {
          return res.status(400).json({ message: "linkUrl is required for type=false" });
        }
        if (req.files?.images?.length > 0) {
          return res.status(400).json({ message: "Images should not be provided when type=false" });
        }
  
        if (gallery.imageUrl) {
          gallery.imageUrl.split(',').forEach(img => {
            const filePath = path.join(__dirname, "../uploads/gallery", img);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          });
          data.imageUrl = null;
        }
      }
  
      // === Ana görsel (her iki durumda da opsiyonel) ===
      if (req.files?.mainImg?.length > 0) {
        if (gallery.mainImg) {
          const mainPath = path.join(__dirname, "../uploads/gallery", gallery.mainImg);
          if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
        }
        data.mainImg = req.files.mainImg[0].filename;
      }
  
      data.updatedOn = new Date();
      await gallery.update(data);
  
      res.status(200).json({ message: "Gallery updated", data: gallery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  

  post: async (req, res) => {
    try {
      const data = req.body;
      const now = new Date();
      data.createdOn = now;
      data.updatedOn = now;
  
      // Type kontrolü yap
      const type = data.type === "true" || data.type === true;
  
      if (type) {
        // Görsel gönderilmeli, link gönderilmemeli
        if (!req.files?.images?.length) {
          return res.status(400).json({ message: "Image(s) are required for type=true" });
        }
        if (data.linkUrl) {
          return res.status(400).json({ message: "linkUrl should not be provided when type=true" });
        }
  
        data.imageUrl = req.files.images.map(f => f.filename).join(',');
      } else {
        // Link gönderilmeli, görsel gönderilmemeli
        if (!data.linkUrl) {
          return res.status(400).json({ message: "linkUrl is required for type=false" });
        }
        if (req.files?.images?.length) {
          return res.status(400).json({ message: "Images should not be provided when type=false" });
        }
      }
  
      // Ana görsel opsiyonel
      if (req.files?.mainImg?.length > 0) {
        data.mainImg = req.files.mainImg[0].filename;
      }
  
      const newGallery = await galleryModel.create(data);
  
      res.status(201).json({ message: "Gallery created", data: newGallery });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  
};

module.exports = gallery_controller;
