import React, { useState } from "react";
import { ImPlus } from "react-icons/im";
import { IconContext } from "react-icons";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }

  const [isExpanded, setIsExpanded] = React.useState(false);
  function handleClick() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form action="POST" className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <button type="submit" onClick={submitNote}>
          <IconContext.Provider value={{ size: 17 }}>
            <ImPlus />
          </IconContext.Provider>
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
