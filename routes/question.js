const express = require("express");
const router = express.Router();

const questionController = require("../app/controller/questionController");

//      http://localhost:2000/questions/create      Question Created
router.post("/create", questionController.create);

//      http://localhost:2000/allquestions    Get All  Question 
router.get("/:id", questionController.showQuestion);

//      http://localhost:2000/questions/id/delete    Deleted Questions
router.delete("/:id/delete", questionController.deleteQuestion);

//      http://localhost:2000/questions/id/options/create      Create Options
router.post("/:id/options/create", questionController.addOptions);

module.exports = router;
