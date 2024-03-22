require('dotenv').config()
const Question = require("../../models/question");
const Option = require("../../models/option");

module.exports.create = async (req, res) => {
  try {
    let question = await Question.create({
      title: req.body.title,
      vote: false,
    });

    if (question) {
      return res.json(200, {
        message: "Question successfully Created",
        data: question,
      });
    } else {
      return res.json(400, {
        message: "Question not created",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports.deleteQuestion = async function (req, res) {
  console.log(req.params.id);
  try {
    let deleteQues = await Question.findByIdAndDelete({ _id: req.params.id });
    if (deleteQues) {
      await Option.deleteMany({ question: req.params.id });

      return res.json(200, {
        message: "Question and associated options deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};


module.exports.addOptions = async function (req, res) {
  try {
    let ques = await Question.findById({ _id: req.params.id });
    const id = ques.options.length + 1;
    const uniqueId = `${req.params.id}${id}`;

    if (ques) {
      let option = await Option.create({
        id: uniqueId,
        question: req.params.id,
        text: req.body.text,
        votes: 0,
        link_to_vote: `https://${req.headers.host}/options/${uniqueId}/add_vote`,
      });

      await ques.options.push(option);
      await ques.save();

      return res.status(200).json({
        message: "options added successfully !",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Error in creating options",
    });
    console.log("Error", err);
  }
};

module.exports.showQuestion = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).populate({
      path: "options",
    });

    if (question) {
      return res.status(200).json({
        message: "Here is the questions",
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
