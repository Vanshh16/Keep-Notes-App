const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Item = require("./mongo");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.get("/", cors(), function (req, res) {});

app.post("/insert", function (req, res) {
  const { title, content } = req.body.newNote;
  const item = new Item({
    title: title,
    content: content,
  });

  item.save().then(function (saved) {
    if (saved) {
      // res.redirect("/data");
    }
  });
});
app.post("/delete", function (req, res) {
  const id = req.body.id;
  console.log(id);
  Item.findByIdAndRemove(id).then(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed User : ", docs);
    }
  });
});

app.get("/display", function (req, res) {
  Item.find()
    .then(function (storedPosts) {
      console.log(storedPosts);
      res.send({
        status: "ok",
        post: storedPosts,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen("4000", function () {
  console.log("Server is at started at port 4000");
});
