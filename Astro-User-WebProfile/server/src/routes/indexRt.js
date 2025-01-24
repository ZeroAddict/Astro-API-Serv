const express = require("express");
const user = require("./userRoute.js");
const astronomyPostRoutes = require('./astronomyPostRoutes'); 

const routeHandler = express.Router();

routeHandler.use("/user", user);
// route in app will match /api/v1/user
//appears with /user path
routeHandler.use("/astronomyPosts", astronomyPostRoutes);

module.exports = routeHandler;
