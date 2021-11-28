var mongoose = require("mongoose");

let layoutThreeSchema = mongoose.Schema(
  {

  },
  {
    timestamps: true,
    strict: false
  }
);

var layoutThreeModel = mongoose.model("layoutThree", layoutThreeSchema);

module.exports = layoutThreeModel;