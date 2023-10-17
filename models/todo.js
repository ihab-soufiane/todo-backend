const mongoose = require('mongoose');
constjoi = require('joi');
const todo_Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true })
const Todos = mongoose.model("Todos ", todo_Schema);

function validateTodo(obj) {
    const schema = joi.object({
        content: joi.String().trim().min(3).max(255),
    })
}
module.exports = {
    Todos,
    validateTodo
}