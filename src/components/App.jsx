import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";
import CreateArea from "./CreateArea";

function App() {
  useEffect(display, []);
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    insert(newNote);
    setTimeout(display, 10);
  }

  function insert(newNote) {
    axios.post("http://localhost:4000/insert", {
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
    axios.post("http://localhost:4000/delete", {
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

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
