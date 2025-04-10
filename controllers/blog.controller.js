const Blog = require("../models/blog.model");
const fs = require("fs");
const path = require("path");

const buildImageUrl = (filename, folder) => {
  if (!filename) return null;
  return `${process.env.BASE_URL || "http://localhost:3000"}/uploads/${folder}/${filename}`;
};

const blog_controller = {
  getAll: async (req, res) => {
    try {
      const blogs = await Blog.findAll();
      const result = blogs.map(b => ({
        ...b.toJSON(),
        imageUrl: buildImageUrl(b.imageUrl, "blog")
      }));

      res.status(200).json({ message: "success", data: result });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id);
      if (!blog) return res.status(404).json({ message: "not found" });

      const result = {
        ...blog.toJSON(),
        imageUrl: buildImageUrl(blog.imageUrl, "blog")
      };

      res.status(200).json({ message: "success", data: result });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const data = req.body;
      const now = new Date();
      data.createdOn = now;
      data.updatedOn = now;

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      data.imageUrl = req.file.filename;

      let blog;
      try {
        blog = await Blog.create(data);
      } catch (createErr) {
        const filePath = path.join(__dirname, "../uploads/blog", data.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ message: "Validation error", error: createErr.message });
      }

      res.status(201).json({ message: "created", data: blog });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id);
      if (!blog) return res.status(404).json({ message: "not found" });

      const now = new Date();
      const updateData = {
        ...req.body,
        updatedOn: now
      };

      if (req.file) {
        const newImage = req.file.filename;
        const oldImage = blog.imageUrl;

        if (oldImage) {
          const oldPath = path.join(__dirname, "../uploads/blog", oldImage);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        updateData.imageUrl = newImage;
      }

      await blog.update(updateData);
      res.status(200).json({ message: "updated", data: blog });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id);
      if (!blog) return res.status(404).json({ message: "not found" });

      if (blog.imageUrl) {
        const filePath = path.join(__dirname, "../uploads/blog", blog.imageUrl);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await blog.destroy();
      res.status(200).json({ message: "deleted", data: blog });
    } catch (err) {
      res.status(500).json({ message: "server error", error: err.message });
    }
  }
};

module.exports = blog_controller;
