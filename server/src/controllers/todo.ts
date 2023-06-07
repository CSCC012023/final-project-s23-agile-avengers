import { Request, Response } from "express";

import { modelTodo } from "../models/todo";

export const getSingleTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    modelTodo.find({ _id: id })
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Todo not found", error: err.message })
        );
};

export const getAllTodo = (req: Request, res: Response) => {
    modelTodo.find()
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Todo not found", error: err.message })
        );
};

export const postCreateTodo = (req: Request, res: Response) => {
    modelTodo.create(req.body)
        .then((data) => res.json({ message: "Todo added successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to add todo", error: err.message })
        );
};

export const putUpdateTodo = (req: Request, res: Response) => {
    modelTodo.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update todo", error: err.message })
        );
};

export const deleteTodo = (req: Request, res: Response) => {
    modelTodo.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "todo deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "book not found", error: err.message })
        );
};