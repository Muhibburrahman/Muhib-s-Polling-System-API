const express = require("express");
const router = express.Router();
const homeController = require("../app/controller/homeContoller");

router.get("/",(req,resp)=>{
    resp.render("home")
})
router.get("/allquestions", homeController.home);
router.get("/api", homeController.api);

router.use("/questions", require("./question"));
router.use("/options", require("./option"));

module.exports = router;

