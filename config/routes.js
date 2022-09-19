const routes = require('express').Router();

routes.use("/api/user",require("../controller/UserController"));
routes.use("/api/category",require("../controller/CategoryController"));
routes.use("/api/auth",require("../controller/AuthController"));
routes.use("/api/profile",require("../controller/ProfileController"));
routes.use("/api/admin/auth",require("../controller/AdminAuthController"));
routes.use("/api/product",require("../controller/ProductController"));

module.exports = routes;