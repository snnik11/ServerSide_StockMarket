const express = require("express");
const router = express.Router();

const controller = require("./controllers/controller");
const quotecontroller = require("./controllers/quotecontroller")

router.get("/", controller.renderHomePage);
router.get("/profile", controller.renderProfilePage);

 router.post("/", controller.getStock);
 router.post("/profile", controller.getProfile);


 
// router.get("/", quotecontroller.renderQuotePage);
// router.get("/profile", controller.renderProfilePage);

//  router.post("/", quotecontroller.getQuote);
//  router.post("/profile", quotecontroller.getProfile);
module.exports = router;