/**
 * router defination file
 */

const express = require("express");
const router = express.Router();

const { addCategory, getCategory, findCategory } = require("./category");
const { addProduct, getProduct, updateProduct } = require("./product");

router.get("*", function(req, res, next) {
  console.info(`URL: ${req.url}`);
  return next();
});

/**
 * send ok if all prerequisite are satisfied
 */
router.get("/ping", async (req, res) => {
  if (findCategory()[0] != null) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
});

router.post("/category/add", addCategory);
router.get("/category/get", getCategory);
router.post("/product/add", addProduct);
router.post("/product/get", getProduct);
router.put("/product/update", updateProduct);

module.exports = router;
