// load dependencies
const express = require("express");
const cookieParser = require("cookie-parser");

const ErrorHandler = require("./middlewares/error-handler");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const {CONTEXT_PATH} = process.env;

//product-management
const productRoutes = require("./routes/product-route")

const app = express();

app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);

app.use("/api/products",productRoutes)

app.use("*", (req, res, next) => {
  console.log(`route ${req.baseUrl} not found`);

  res.status(404).json({ message: "not found" });
});

// Error Handler
app.use(ErrorHandler);

module.exports = app;
