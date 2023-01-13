const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  skin: { type: Number, default: 1 },
});

module.exports = model("User", userSchema)
