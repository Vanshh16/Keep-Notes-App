import React, { useEffect, useState } from "react";
import { ImPlus } from "react-icons/im";
import { IconContext } from "react-icons";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const postTheme = "post-" + location.state.theme;
  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultContent, setDefaultContent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");

  setTimeout(() => {
    axios.get("http://localhost:4000/update").then(function (response) {
      // console.log(response.data.requiredPost);
      setDefaultTitle(response.data.requiredPost.title);
      setDefaultContent(response.data.requiredPost.content);
      setId(response.data.requiredPost._id);
    });
  }, 100);

  useEffect(() => {
    console.log("Title=" + title);
    console.log("Dtitle=" + defaultTitle);
    setTitle(defaultTitle);
    setContent(defaultContent);
  }, [defaultTitle]);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(title);
    console.log(content);
    setTimeout(() => {
      navigate("/");
    }, 10);
    console.log("Put active");
    const res = await axios.put("http://localhost:4000/updateNote", {
      title: title,
      content: content,
      id: id,
    });
  }
  async function handleCancel(event) {
    event.preventDefault();
    setTimeout(() => {
      navigate("/");
    }, 10);
  }

  return (
    <div>
      <Header theme={location.state.theme} />

      <form method="PUT" className={`post-note ${postTheme}`}>
        <input
          placeholder="Enter title"
          defaultValue={defaultTitle}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <textarea
          placeholder="Start writing..."
          rows="10"
          defaultValue={defaultContent}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button
          className="post-button post-submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="post-button post-cancel"
          type="submit"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>

      <Footer />
    </div>
  );
}

export default Post;
