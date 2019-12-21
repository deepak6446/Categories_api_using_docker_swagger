const Mongoose = require("mongoose");
const db = require("../config/connectMongoose.js");

const productSchema = new Mongoose.Schema({
  categories: { type: Object, default: [] },
  product: { type: String },
  price: { type: Number, default: 0 }
});

const product = db.model("product", productSchema);

module.exports = product;
