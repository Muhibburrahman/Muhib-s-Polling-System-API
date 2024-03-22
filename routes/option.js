const express = require("express");
const router = express.Router();
const optionController = require("../app/controller/optionController");


//        http://localhost:2000/options/:id/add_vote
router.post("/:id/add_vote", optionController.addVote);

//        http://localhost:2000/options/:id/delete
router.delete("/:id/delete", optionController.deleteOption);

module.exports = router;
