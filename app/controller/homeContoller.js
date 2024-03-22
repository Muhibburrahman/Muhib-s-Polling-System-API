const Question = require("../../models/question");


module.exports.home = async function (req, res) {
  try {
    let question = await Question.find({}).populate({
      path: "options",
    });

    if (question) {
      return res.status(200).json({
        message: "successfully , find out your questions !",
        data: question,
      });
    } else {
      return res.status(400).json({
        message: "Question does not does not exists",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error from the server ",
      data: err,
    });
  }
};


module.exports.api = function(req , res){
  res.send("<h1> Your Polling System API Successfull Run ! </h1>") ; 
}