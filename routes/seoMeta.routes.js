const express = require("express");
const router = express.Router();
const seoMetaController = require("../controllers/seoMeta.controller");
const isAuth = require("../middleware/is-auth");

router.get("/api/seometaseses", seoMetaController.getAll);
router.get("/api/seometases/:id", seoMetaController.getOne);
router.post("/api/seometases", isAuth, seoMetaController.post);
router.put("/api/seometases/:id", isAuth, seoMetaController.update);
router.delete("/api/seometases/:id", isAuth, seoMetaController.delete);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: SeoMeta
 *   description: SEO Meta management
 */

/**
 * @swagger
 * /api/seometases:
 *   get:
 *     summary: Get all SEO Meta entries
 *     tags: [SeoMeta]
 *     responses:
 *       200:
 *         description: A list of SEO Meta
 */

/**
 * @swagger
 * /api/seometases/{id}:
 *   get:
 *     summary: Get a single SEO Meta by ID
 *     tags: [SeoMeta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO Meta ID
 *     responses:
 *       200:
 *         description: SEO Meta found
 */

/**
 * @swagger
 * /api/seometases:
 *   post:
 *     summary: Create a new SEO Meta entry
 *     tags: [SeoMeta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - metaTitle
 *             properties:
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaTags:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: SEO Meta created
 */

/**
 * @swagger
 * /api/seometases/{id}:
 *   put:
 *     summary: Update an existing SEO Meta entry
 *     tags: [SeoMeta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO Meta ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metaTitle:
 *                 type: string
 *               metaDescription:
 *                 type: string
 *               metaTags:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: SEO Meta updated
 */

/**
 * @swagger
 * /api/seometases/{id}:
 *   delete:
 *     summary: Delete SEO Meta by ID
 *     tags: [SeoMeta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO Meta ID
 *     responses:
 *       200:
 *         description: SEO Meta deleted
 */
