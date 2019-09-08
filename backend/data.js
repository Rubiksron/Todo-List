const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    todo: String,
    id: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Data", DataSchema);
