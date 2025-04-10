// login.routes.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/api/login', (req, res) => { 
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({ token });
});

module.exports = router;


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Admin login to obtain JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Successful login with JWT token
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid username or password
 */
