const express = require("express");
const router = express.Router();

const controller = require("./controllers/controller");

router.get("/", controller.renderHomePage);
 router.get("/profile", controller.renderProfilePage);

 router.post("/", controller.getStock);

module.exports = router;