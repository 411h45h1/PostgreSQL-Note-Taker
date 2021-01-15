const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./pool");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// serve react in prod
if (process.env.NODE_ENV === "production") {
  // static assets react builds
  app.use(express.static("client/build"));
  // if route '/' is hit find the index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

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
