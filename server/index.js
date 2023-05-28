const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // with pool, we can now run queries with postgres

const PORT = 5000;

// middleware
app.use(cors()); // can connect multiple domains with this (eg : localhost 5000 and 3000)
app.use(express.json()); // can use req.body with the help of this

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});

// ROUTES

// CREATE A TODO

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", // RETURNING * used whenever insert, update, delete
            [description]
        )
        res.json(newTodo);
    } catch (e) {
        console.log(e.message)
    }
})

// GET ALL TODOS

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);
    } catch (e) {
        console.log(e.message);
    }
})

// GET A TODO

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(singleTodo.rows);

    } catch (e) {
        console.log(e.message);
    }
})

// UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("updated!!")

    } catch (e) {
        console.log(e.message);
    }
})

// DELETE A TODO

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        console.log(res.json("DELETED!!"));
    } catch (e) {
        console.log(e.message);
    }
})

