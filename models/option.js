const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    text: {
      type: String,
    },
    votes : {
      type: Number,
    },
    link_to_vote: {
      type: String,
    },
  },
  {
    timeStamps: true, 
  }
);

const Option = mongoose.model("Option", optionSchema);
module.exports = Option;
