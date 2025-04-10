const express = require("express");
const router = express.Router();
const seoDataController = require("../controllers/seoData.controller");
const isAuth = require("../middleware/is-auth");

// GET all
router.get("/api/seos", seoDataController.getAll);

// GET one
router.get("/api/seos/:id", seoDataController.getOne);

// POST
router.post("/api/seos", isAuth, seoDataController.post);

// PUT
router.put("/api/seos/:id", isAuth, seoDataController.update);

// DELETE
router.delete("/api/seos/:id", isAuth, seoDataController.delete);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: SeoData
 *   description: SEO Data management
 */

/**
 * @swagger
 * /api/seos:
 *   get:
 *     summary: Get all SEO Data entries
 *     tags: [SeoData]
 *     responses:
 *       200:
 *         description: A list of SEO Data
 */

/**
 * @swagger
 * /api/seos/{id}:
 *   get:
 *     summary: Get a single SEO Data by ID
 *     tags: [SeoData]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SEO Data ID
 *     responses:
 *       200:
 *         description: SEO Data found
 *       404:
 *         description: SEO Data not found
 */

/**
 * @swagger
 * /api/seos:
 *   post:
 *     summary: Create a new SEO Data entry
 *     tags: [SeoData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - altText
 *               - anchorText
 *             properties:
 *               altText:
 *                 type: string
 *               anchorText:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: SEO Data created
 */

/**
 * @swagger
 * /api/seos/{id}:
 *   put:
 *     summary: Update an existing SEO Data entry
 *     tags: [SeoData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO Data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               altText:
 *                 type: string
 *               anchorText:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: SEO Data updated
 */

/**
 * @swagger
 * /api/seos/{id}:
 *   delete:
 *     summary: Delete SEO Data by ID
 *     tags: [SeoData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO Data ID
 *     responses:
 *       200:
 *         description: SEO Data deleted
 */
