const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  center: { type: String, required: true },
});

module.exports = mongoose.model("Operator", operatorSchema);
