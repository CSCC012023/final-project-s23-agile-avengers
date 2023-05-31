import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    description: {
        type: "String",
        required: true,
    },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;