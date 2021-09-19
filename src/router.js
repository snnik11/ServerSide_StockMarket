const express = require("express");
const router = express.Router();
const request = require("request")
const controller = require("./controllers/controller");
const newscontroller = require("./controllers/newscontroller");
const profilecontroller = require("./controllers/profilecontroller");

router.get("/", controller.renderHomePage);
router.get("/profile", controller.renderProfilePage);

router.get("/news",controller.renderNewsPage)

router.post("/",controller.getStock);
router.post("/profile", profilecontroller.getProfile);
router.post("/news", newscontroller.getNews)

module.exports = router;