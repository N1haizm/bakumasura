const express = require("express");
const slide_router = express.Router();
const slideController = require("../controllers/slide.controller");
const isAuth = require("../middleware/is-auth");
const { uploadSingleWithModel } = require("../middleware/upload");

// ROUTES
slide_router.get("/api/slides", slideController.getAll);
slide_router.get("/api/slides/:id", slideController.getOne);
slide_router.post("/api/slides", isAuth, uploadSingleWithModel("slide"), slideController.post);
slide_router.put("/api/slides/:id", isAuth, uploadSingleWithModel("slide"), slideController.update);
slide_router.delete("/api/slides/:id", isAuth, slideController.delete);

module.exports = slide_router;

/**
 * @swagger
 * tags:
 *   name: Slide
 *   description: Slide management
 */

/**
 * @swagger
 * /api/slides:
 *   get:
 *     summary: Retrieve all slides
 *     tags: [Slide]
 *     responses:
 *       200:
 *         description: List of slides
 */

/**
 * @swagger
 * /api/slides/{id}:
 *   get:
 *     summary: Retrieve a slide by ID
 *     tags: [Slide]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Slide ID
 *     responses:
 *       200:
 *         description: Slide found
 *       404:
 *         description: Slide not found
 */

/**
 * @swagger
 * /api/slides:
 *   post:
 *     summary: Create a new slide
 *     tags: [Slide]
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
 *             required:
 *               - image
 *             properties:
 *               altText:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Slide created
 *       400:
 *         description: Validation error or missing image
 */

/**
 * @swagger
 * /api/slides/{id}:
 *   put:
 *     summary: Update an existing slide
 *     tags: [Slide]
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
 *         description: Slide ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               altText:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Slide updated
 *       404:
 *         description: Slide not found
 */

/**
 * @swagger
 * /api/slides/{id}:
 *   delete:
 *     summary: Delete a slide by ID
 *     tags: [Slide]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Slide ID
 *     responses:
 *       200:
 *         description: Slide deleted
 *       404:
 *         description: Slide not found
 */
