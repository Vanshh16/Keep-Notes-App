import React, { useEffect } from "react";
import { ImBin } from "react-icons/im";
import { IconContext } from "react-icons";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Note(props) {
  const navigate = useNavigate();

  let requiredNote;
  function handleClick() {
    props.onDelete(props.id);
  }
  const id = props.id;
  function update() {
    axios.post("http://localhost:4000/update", {
        id,
      })
      .then((res) => {
        requiredNote = res.data.requiredPost;
        console.log("from POST" + requiredNote);
      })
      .catch((err) => {
        alert("wrong details");
        console.log(err);
      });
    navigate("/post");
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={update}>
        <IconContext.Provider value={{ size: 18 }}>
          <FaEdit />
        </IconContext.Provider>
      </button>
      <button onClick={handleClick}>
        <IconContext.Provider value={{ size: 18 }}>
          <ImBin />
        </IconContext.Provider>
      </button>
    </div>
  );
}

export default Note;
