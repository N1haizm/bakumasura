const express = require("express");
const product_router = express.Router();
const productController = require("../controllers/product.controller");
const isAuth = require("../middleware/is-auth");
const { uploadSingleWithModel } = require("../middleware/upload");

// GET all products
product_router.get("/api/products", productController.getAll);

// GET one product
product_router.get("/api/products/:id", productController.getOne);

// POST new product
product_router.post(
  "/api/products",
  isAuth,
  uploadSingleWithModel("product"),
  productController.post
);

// PUT update product
product_router.put(
  "/api/products/:id",
  isAuth,
  uploadSingleWithModel("product"),
  productController.update
);

// DELETE product
product_router.delete("/api/products/:id", isAuth, productController.delete);

module.exports = product_router;
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Product]
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         schema:
 *           type: string
 *         required: false
 *         description: Language code (e.g., az, en, ru)
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *       - in: header
 *         name: accept-language
 *         schema:
 *           type: string
 *         required: false
 *         description: Language code (e.g., az, en, ru)
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
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
 *               categoryId:
 *                 type: integer
 *               price:
 *                 type: number
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               translations:
 *                 type: string
 *                 description: JSON string of translation objects
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Product]
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
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               altText:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               price:
 *                 type: number
 *               updatedBy:
 *                 type: string
 *               translations:
 *                 type: string
 *                 description: JSON string of translation objects
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
