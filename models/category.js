const Mongoose = require("mongoose");
const db = require("../config/connectMongoose.js");

const categorySchema = new Mongoose.Schema({
  child_categories: { type: Object, default: [] },
  category: { type: String },
  parent_categories: { type: String, default: "/" }
});

const category = db.model("category", categorySchema);

module.exports = category;
