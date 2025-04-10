const express = require("express");
const setting_router = express.Router();
const setting_controller = require("../controllers/setting.controller");
const isAuth = require("../middleware/is-auth");
const { uploadSingleWithModel } = require("../middleware/upload");

// GET all settings
setting_router.get("/api/settings", setting_controller.getAll);

// GET single setting
setting_router.get("/api/settings/:id", setting_controller.getOne);

// POST new setting
setting_router.post(
  "/api/settings",
  isAuth,
  uploadSingleWithModel("setting"),
  setting_controller.post
);

// PUT update setting
setting_router.put(
  "/api/settings/:id",
  isAuth,
  uploadSingleWithModel("setting"),
  setting_controller.update
);

// DELETE setting
setting_router.delete("/api/settings/:id", isAuth, setting_controller.delete);

module.exports = setting_router;


/**
 * @swagger
 * tags:
 *   name: Setting
 *   description: Setting management
 */

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Retrieve all settings
 *     tags: [Setting]
 *     parameters:
 *       - in: header
 *         name: accept-language
 *         schema:
 *           type: string
 *         required: false
 *         description: Language code (e.g., az, en, ru)
 *     responses:
 *       200:
 *         description: List of settings retrieved successfully
 */

/**
 * @swagger
 * /api/settings/{id}:
 *   get:
 *     summary: Retrieve a setting by ID
 *     tags: [Setting]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Setting ID
 *     responses:
 *       200:
 *         description: Setting retrieved successfully
 *       404:
 *         description: Setting not found
 */

/**
 * @swagger
 * /api/settings:
 *   post:
 *     summary: Create a new setting
 *     tags: [Setting]
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
 *         description: Setting created successfully
 */

/**
 * @swagger
 * /api/settings/{id}:
 *   put:
 *     summary: Update an existing setting
 *     tags: [Setting]
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
 *         description: Setting ID
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
 *         description: Setting updated successfully
 */

/**
 * @swagger
 * /api/settings/{id}:
 *   delete:
 *     summary: Delete a setting by ID
 *     tags: [Setting]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Setting ID
 *     responses:
 *       200:
 *         description: Setting deleted successfully
 *       404:
 *         description: Setting not found
 */
