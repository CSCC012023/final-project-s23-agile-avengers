var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.ts"); // with pool, we can now run queries with postgres
const PORT = 5000;
// middleware
app.use(cors()); // can connect multiple domains with this (eg : localhost 5000 and 3000)
app.use(express.json()); // can use req.body with the help of this
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});
// ROUTES
// CREATE A TODO
app.post("/todos", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const newTodo = yield pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", // RETURNING * used whenever insert, update, delete
        [description]);
        res.json(newTodo);
    }
    catch (e) {
        console.log(e.message);
    }
}));
// GET ALL TODOS
app.get("/todos", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const allTodos = yield pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    }
    catch (e) {
        console.log(e.message);
    }
}));
// GET A TODO
app.get("/todos/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleTodo = yield pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(singleTodo.rows);
    }
    catch (e) {
        console.log(e.message);
    }
}));
// UPDATE A TODO
app.put("/todos/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = yield pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("updated!!");
    }
    catch (e) {
        console.log(e.message);
    }
}));
// DELETE A TODO
app.delete("/todos/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteTodo = yield pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        console.log(res.json("DELETED!!"));
    }
    catch (e) {
        console.log(e.message);
    }
}));
