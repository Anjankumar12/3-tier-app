const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) return console.error("DB connection error:", err);
  console.log("Connected to DB");
});

app.get("/", (req, res) => {
  db.query("SELECT message FROM messages LIMIT 1", (err, result) => {
    if (err) return res.status(500).send("Error: " + err);
    res.send(result[0].message);
  });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
