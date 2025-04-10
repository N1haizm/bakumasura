// app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/dbconnect');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // JSON body parser

// Routers
const loginRouter = require('./routes/login.routes');
const galleryRouter = require("./routes/gallery.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/categories.routes");
const settingRouter = require('./routes/setting.routes');
const slideRouter = require('./routes/slide.routes');
const blogRouter = require('./routes/blog.routes');
const seoMetaRouter = require('./routes/seoMeta.routes');
const seoUrlRouter = require('./routes/seoUrl.routes');
const seoDataRouter = require('./routes/seoData.routes');

// Auth middleware
const isAuth = require('./middleware/is-auth');

// Swagger
const setupSwagger = require('./config/swagger');
setupSwagger(app);

// DB connection and sync
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Public route
app.use(loginRouter); // Keep this route to handle login

// Protected routes
app.use(galleryRouter);
app.use(productRouter);
app.use(categoryRouter);
app.use(settingRouter);
app.use(slideRouter);
app.use(blogRouter);
app.use(seoMetaRouter);
app.use(seoUrlRouter);
app.use(seoDataRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
// app.js veya server.js içinde:
app.use("/uploads", express.static("uploads"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
