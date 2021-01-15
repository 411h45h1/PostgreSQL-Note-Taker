import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { Label, Segment } from "semantic-ui-react";
import { Media, MediaContextProvider } from "./config/media";
import EditNote from "./components/EditNote";

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
      }).then(() => {
        setNotes(notes.filter((note) => note.nid !== id));
        window.location = "/";
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <MediaContextProvider>
      <Media at="mobile">
        <div className="App">
          <header>
            <h1 style={{ fontSize: "40px" }}>PostgreSQL Note Taker</h1>
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "95vw",
            }}
          >
            <Input />
            <Segment
              style={{
                backgroundColor: "brown",
                borderRadius: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                flexWrap: "wrap",
                overflowY: "auto",
              }}
            >
              {notes.map((i, k) => (
                <Segment
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "24vw",
                    minWidth: "23vw",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "beige",
                    margin: "7px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  key={k}
                >
                  <Label
                    as="a"
                    attached="bottom right"
                    content={`#${i.nid}`}
                    onClick={() => deleteTodo(i.nid)}
                    color="black"
                  />

                  <p style={{ margin: 18 }}>{i.description}</p>

                  <EditNote data={i} />

                  <Label
                    as="a"
                    attached="top left"
                    content="Delete"
                    onClick={() => deleteTodo(i.nid)}
                    color="red"
                  />
                </Segment>
              ))}
            </Segment>
          </div>
        </div>
      </Media>
      <Media greaterThanOrEqual="tablet">
        <div className="App">
          <header>
            <h1 style={{ fontSize: "40px" }}>PostgreSQL Note Taker</h1>
          </header>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95vw",
            }}
          >
            <Input />
            <Segment
              style={{
                backgroundColor: "brown",
                borderRadius: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "75vh",
                width: "60%",
                flexWrap: "wrap",
                overflowY: "auto",
              }}
            >
              {notes.map((i, k) => (
                <Segment
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "24vw",
                    minWidth: "15vw",
                    minHeight: "100px",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "beige",
                    margin: "7px",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                  key={k}
                >
                  <Label
                    as="a"
                    attached="bottom right"
                    content={`#${i.nid}`}
                    onClick={() => deleteTodo(i.nid)}
                    color="black"
                  />

                  <p style={{ margin: 18 }}>{i.description}</p>

                  <EditNote data={i} />

                  <Label
                    as="a"
                    attached="top left"
                    content="Delete"
                    onClick={() => deleteTodo(i.nid)}
                    color="red"
                  />
                </Segment>
              ))}
            </Segment>
          </div>
        </div>
      </Media>
    </MediaContextProvider>
  );
};

export default App;
