const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const isAuth = require("../middleware/is-auth");
const { uploadSingleWithModel } = require("../middleware/upload");

// GET all blogs
router.get("/api/blogs", blogController.getAll);

// GET one blog by ID
router.get("/api/blogs/:id", blogController.getOne);

// POST a new blog
router.post(
  "/api/blogs",
  isAuth,
  uploadSingleWithModel("blog"),
  blogController.post
);

// PUT update blog
router.put(
  "/api/blogs/:id",
  isAuth,
  uploadSingleWithModel("blog"),
  blogController.update
);

// DELETE blog
router.delete("/api/blogs/:id", isAuth, blogController.delete);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management
 */

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: Blog list retrieved successfully
 */

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a blog by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
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
 *         description: Blog created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update an existing blog
 *     tags: [Blog]
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
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               altText:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
