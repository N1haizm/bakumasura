const express = require("express");
const router = express.Router();
const seoUrlController = require("../controllers/seoUrl.controller");
const isAuth = require("../middleware/is-auth");

router.get("/api/seourlses", seoUrlController.getAll);
router.get("/api/seourlses/:id", seoUrlController.getOne);
router.post("/api/seourlses", isAuth, seoUrlController.post);
router.put("/api/seourlses/:id", isAuth, seoUrlController.update);
router.delete("/api/seourlses/:id", isAuth, seoUrlController.delete);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: SeoUrl
 *   description: SEO URL management
 */

/**
 * @swagger
 * /api/seourlses:
 *   get:
 *     summary: Get all SEO URLs
 *     tags: [SeoUrl]
 *     responses:
 *       200:
 *         description: List of SEO URLs
 */

/**
 * @swagger
 * /api/seourlses/{id}:
 *   get:
 *     summary: Get SEO URL by ID
 *     tags: [SeoUrl]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: SEO URL ID
 *     responses:
 *       200:
 *         description: SEO URL found
 */

/**
 * @swagger
 * /api/seourlses:
 *   post:
 *     summary: Create new SEO URL
 *     tags: [SeoUrl]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *               redirectUrl:
 *                 type: string
 *               createdBy:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: SEO URL created
 */

/**
 * @swagger
 * /api/seourlses/{id}:
 *   put:
 *     summary: Update SEO URL
 *     tags: [SeoUrl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO URL ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               redirectUrl:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: SEO URL updated
 */

/**
 * @swagger
 * /api/seourlses/{id}:
 *   delete:
 *     summary: Delete SEO URL by ID
 *     tags: [SeoUrl]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: SEO URL ID
 *     responses:
 *       200:
 *         description: SEO URL deleted
 */
