import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  // db.all(
  //   "SELECT * FROM todo WHERE is_complete = FALSE UNION ALL SELECT * FROM todo WHERE is_complete = TRUE;",
  //   (err, rows) => {
  //     if (err) {
  //       return res.status(500).json({ error: err });
  //     }
  //     res.json(rows);
  //   }
  // );
});

app.post("/todos", (req, res) => {
  const { description, is_complete } = req.body;

  // db.run(
  //   "INSERT INTO todo (description, is_complete) VALUES (?, ?);",
  //   description,
  //   is_complete || false,
  //   function (err) {
  //     if (err) {
  //       return res.status(500).json({ error: err });
  //     }

  //     res.json(this.lastID);
  //   }
  // );
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { description, is_complete } = req.body;

  // db.run(
  //   "UPDATE todo SET description = ?, is_complete = ? WHERE id = ?;",
  //   description,
  //   is_complete,
  //   id,
  //   function (err) {
  //     if (err) {
  //       return res.status(500).json({ error: err });
  //     }

  //     res.json({ changes: this.changes });
  //   }
  // );
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  // db.run("DELETE FROM todo WHERE id = ?;", id, function (err) {
  //   if (err) {
  //     return res.status(500).json({ error: err });
  //   }

  //   res.status(204).end();
  // });
});

app.listen(3040);
