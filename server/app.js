import sqlite3 from "sqlite3";
import express from "express";
import cors from "cors";

const db = new (sqlite3.verbose()).Database("./data.sqlite3");
const app = express();

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            is_complete BOOLEAN NOT NULL 
        );
        `);

    db.get("SELECT * FROM todo", (err, row) => {
        if (row) return;


        db.run(`
            INSERT INTO todo (description, is_complete)
            VALUES ("This is an example description", false);
        `);
    });
});

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todo;", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.json(rows);
    });
});

app.post("/todos", (req, res) => {
    const { description, is_complete } = req.body;

    db.run("INSERT INTO todo (description, is_complete) VALUES (?, ?);", description, is_complete || false, function(err) {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.json(this.lastID);
    });
});

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { description, is_complete } = req.body;
    console.log(req.body);
    

    db.run("UPDATE todo SET description = ?, is_complete = ? WHERE id = ?;", description, is_complete, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.json({ changes: this.changes });
    });
});

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM todo WHERE id = ?;", id, function(err) {
        if (err) {
            return res.status(500).json({ error: err });
        }

        res.status(204).end();
    });
});

app.listen(3040);