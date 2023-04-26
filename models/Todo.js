const {Schema, model,Types} =require("mongoose")




const schema = new Schema({
    owner: {type: Types.ObjectId, ref: "User"},
    text: {type: String},
    textareaValue: {type: String},
    summa: {  type: String },
    completed: {type: Boolean, default: false},
    important: {type: Boolean, default: false},
    createdAt: { type: String }
 })
 

module.exports = model('Todo', schema)