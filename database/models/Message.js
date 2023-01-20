const {Schema, model} = require("mongoose");

const chatSchema = new Schema({
    from:{type: String},
    message:{type: String}
})
module.exports = model("Message", chatSchema)