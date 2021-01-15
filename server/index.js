const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./pool");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//create
app.post("/notes", async (req, res) => {
  try {
    const { description } = req.body;
    const newNote = await pool.query(
      "INSERT INTO note (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//read all
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM note");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//read specific
app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await pool.query("SELECT * FROM note WHERE nid = $1", [id]);

    res.json(note.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE note SET description = $1 WHERE nid = $2", [
      description,
      id,
    ]);

    res.json("Note Updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM note WHERE nid = $1", [id]);
    res.json("Note Deleted");
  } catch (err) {
    console.log(err.message);
  }
});
