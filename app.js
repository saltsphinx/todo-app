import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./config/passport.js";
import knex from "./config/db.js";
import { ConnectSessionKnexStore } from "connect-session-knex";
import dotenv from "dotenv";
import { redirect } from "react-router-dom";

// Setup
dotenv.config();
const app = express();
const knexStore = new ConnectSessionKnexStore({
  knex: knex,
  createTable: true,
});

app.use(cors());
app.use(express.json());

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ redirect: "/login" });
}

// Express-session
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // days * hours * minutes * seconds * milliseconds
    saveUninitialized: false,
    resave: false,
    store: knexStore,
  })
);

// Passport
app.use(passport.session());

// Endpoints
app.get("/todos", isAuthenticated, async (req, res) => {
  // db.all(
  //   "SELECT * FROM todo WHERE is_complete = FALSE UNION ALL SELECT * FROM todo WHERE is_complete = TRUE;",
  //   (err, rows) => {
  //     if (err) {
  //       return res.status(500).json({ error: err });
  //     }
  //     res.json(rows);
  //   }
  // );

  try {
    const todos = await knex.from("todo");
    res.json(todos);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

app.post("/todos", async (req, res) => {
  const { description, is_complete } = req.body;

  try {
    const result = await knex.insert({ description, is_complete: is_complete || false, user_id: 1 }).into("todo");  
    res.json({ lastID: result });
  } catch (err) {
    res.status(500).json({ err });
  }
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

app.post("/session", (req, res, next) => {
  
  passport.authenticate("local", (err, user, info) => {    
    if (err) return next(err);
    if (!user) return res.status(401).json({ redirect: "/login", info });
    // IMPLEMENT LOGIN FUNCTIONALITY
    
    req.logIn(user, next);
  })(req, res, next);
}, (req, res) => {
  res.json({ redirect: "/login" });
});

app.listen(3040);
