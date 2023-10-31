import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import Post from "./components/Post.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/post" element={<Post />} />
    </Routes>
  </BrowserRouter>
);
