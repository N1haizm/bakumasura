const express = require("express");
const gallery_router = express.Router();
const galleryController = require("../controllers/gallery.controller");
const isAuth = require("../middleware/is-auth");
const { customFieldsUpload } = require("../middleware/upload");

// Çoklu alanları destekle (images[] + mainImg)
const upload = customFieldsUpload([
  { name: "images", maxCount: 10 },
  { name: "mainImg", maxCount: 1 }
], "gallery");

// GET all galleries
gallery_router.get("/api/gallery", galleryController.getAll);

// GET one gallery
gallery_router.get("/api/gallery/:id", galleryController.getOne);

// POST new gallery
gallery_router.post("/api/gallery", isAuth, upload, galleryController.post);

// PUT update gallery
gallery_router.put("/api/gallery/:id", isAuth, upload, galleryController.update);

// DELETE gallery
gallery_router.delete("/api/gallery/:id", isAuth, galleryController.delete);

module.exports = gallery_router;

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery management
 */

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Retrieve all gallery entries
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: Returns all gallery entries
 */

/**
 * @swagger
 * /api/gallery/{id}:
 *   get:
 *     summary: Retrieve a specific gallery by ID
 *     tags: [Gallery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Gallery ID
 *     responses:
 *       200:
 *         description: Gallery found
 *       404:
 *         description: Gallery not found
 */

/**
 * @swagger
 * /api/gallery:
 *   post:
 *     summary: Create a new gallery
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: boolean
 *               linkUrl:
 *                 type: string
 *               altText:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               mainImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Gallery created successfully
 *       400:
 *         description: Upload error
 */

/**
 * @swagger
 * /api/gallery/{id}:
 *   put:
 *     summary: Update an existing gallery
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Gallery ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: boolean
 *               linkUrl:
 *                 type: string
 *               altText:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               mainImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Gallery updated successfully
 *       404:
 *         description: Gallery not found
 */

/**
 * @swagger
 * /api/gallery/{id}:
 *   delete:
 *     summary: Delete a gallery by ID
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Gallery ID
 *     responses:
 *       200:
 *         description: Gallery deleted successfully
 *       404:
 *         description: Gallery not found
 */
