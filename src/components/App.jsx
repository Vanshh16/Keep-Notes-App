import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";
import CreateArea from "./CreateArea";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [checked, setChecked] = useState(true);
  function toggleTheme() {
    if (theme === "light") {
      setChecked(false);
      setTheme("dark");
    } else {
      setChecked(true);
      setTheme("light");
    }
  }
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(display, []);
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    insert(newNote);
    setTimeout(display, 10);
  }

  function insert(newNote) {
    axios
      .post("http://localhost:4000/insert", {
        newNote,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        alert("wrong details");
        console.log(err);
      });
  }
  function display() {
    axios.get("http://localhost:4000/display").then(function (response) {
      console.log(response.data.post);
      const updatedNotes = response.data.post;
      setNotes(updatedNotes);
    });
  }

  function deleteNote(id) {
    axios
      .post("http://localhost:4000/delete", {
        id,
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        alert("wrong details");
        console.log(err);
      });
    setTimeout(display, 100);
  }

  <div>
    <h1>Hello, world!</h1>
  </div>;
  return (
    <div className={{ theme }}>
      <Header theme={theme} />
      <CreateArea onAdd={addNote} theme={theme} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            theme={theme}
          />
        );
      })}
      <Switch
        className="toggle-switch"
        onChange={toggleTheme}
        checked={checked}
        heigth={45}
        width={70}
        onColor="#f8cf5c"
        offColor="#333"
        onHandleColor="#333"
        offHandleColor="#fff"
        uncheckedIcon={
          <FontAwesomeIcon
            className="moon-icon"
            icon={faMoon}
            size="xl"
            style={{ color: "#ebeef5" }}
          />
        }
        checkedIcon={
          <FontAwesomeIcon
            className="sun-icon"
            icon={faSun}
            size="xl"
            style={{ color: "#282c33" }}
          />
        }
      />
      <Footer />
    </div>
  );
}

export default App;
