import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    onNotes();
  }, []);

  const onNotes = async () => {
    try {
      const response = await fetch("http://localhost:5000/notes");
      const jsonData = await response.json();

      setNotes(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      }).then(() => setNotes(notes.filter((note) => note.note_id !== id)));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Postgres Note Taker</h1>
      </header>

      <Input />

      <div className="Notes">
        {notes.map((i, k) => (
          <div id="noteItem" key={k}>
            <h2>#{k + 1}</h2>

            <p>{i.description}</p>

            <button onClick={() => deleteTodo(i.note_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
