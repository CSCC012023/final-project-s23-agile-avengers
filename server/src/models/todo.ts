import { Schema, model } from "mongoose";

import { UserTodo } from "../types/todo";

const TodoSchema = new Schema<UserTodo>({
    description: {
        type: "String",
        required: true,
    },
})

export const modelTodo = model<UserTodo>("todo", TodoSchema)
