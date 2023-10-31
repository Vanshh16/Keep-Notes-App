const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/keeperDB", { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
