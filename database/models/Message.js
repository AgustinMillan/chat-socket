const {Schema, model} = require("mongoose");

const chatSchema = new Schema({
    from:{type: String},
    message:{type: String},
    imageURL: {type: String, default: "http://cdn.onlinewebfonts.com/svg/img_264570.png"}
})
module.exports = model("Message", chatSchema)