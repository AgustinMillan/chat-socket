const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  nameChat: { type: String },
  messages: { type: Array },
  participants: { type: Array },
});
module.exports = model("Chat", chatSchema);
