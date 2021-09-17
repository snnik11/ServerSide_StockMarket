const express = require("express");
const router = express.Router();
const request = require("request")
const controller = require("./controllers/controller");
//const quotecontroller = require("./controllers/quotecontroller")
//const nscontroller = require("./controllers/nscontroller")

router.get("/", controller.renderHomePage);
router.get("/profile", controller.renderProfilePage);

router.get("/news",controller.renderNewsPage)

 router.post("/", controller.getStock);
router.post("/profile", controller.getProfile);
router.post("/news", controller.getNews)

 
// router.get("/", quotecontroller.renderQuotePage);
// router.get("/profile", controller.renderProfilePage);

//  router.post("/", quotecontroller.getQuote);
//  router.post("/profile", quotecontroller.getProfile);


module.exports = router;