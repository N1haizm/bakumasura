const express = require("express");
const category_router = express.Router();
const categoryController = require("../controllers/categories.controller");
const { uploadSingleWithModel } = require("../middleware/upload");
const isAuth = require("../middleware/is-auth");

// GET
category_router.get("/api/categories", categoryController.getAll);
category_router.get("/api/categories/:id", categoryController.getOne);

// POST
category_router.post(
  "/api/categories",
  uploadSingleWithModel("categories"),
  isAuth,
  categoryController.post
);

// PUT
category_router.put(
  "/api/categories/:id",
  uploadSingleWithModel("categories"),
  isAuth,
  categoryController.update
);

// DELETE
category_router.delete("/api/categories/:id", isAuth, categoryController.delete);

module.exports = category_router;


/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Category]
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         schema:
 *           type: string
 *         required: false
 *         description: Language code (e.g., az, en, ru)
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
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
 *               altText:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               translations:
 *                 type: string
 *                 description: JSON array string of translations
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
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
 *         description: Category ID
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
 *               translations:
 *                 type: string
 *                 description: JSON array string of translations
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Category updated successfully
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
