/**
 * contains all code related to add, update product
 * follow swagger file for api definations
 */

const product = require("../models/product");
const { findCategory } = require("./category");
const { wait } = require("../utils");
const {
  mongoError,
  productRequired,
  productFind,
  categoryNotFound,
  categoryExistErr,
  productCreated,
  productExistErr,
  categoryRequired,
  productUpdated,
  productNotFound
} = require("../message");
const lean = {
  lean: true
};

/**
 * @param {*} product_name: string
 * find product by product name
 * if exist then return product
 */
const findProduct = async product_name => {
  let find = { product: product_name };
  let [err, data] = await wait(product.find, product, find, null, lean);
  if (err) {
    console.error("Error in mongo:", err);
    return [err, null];
  } else {
    return [null, data];
  }
};

/**
 * @param {*} categories: array
 *
 * check if categories exit in category collection before adding it in product collection
 */
const categoriesExist = async categories => {
  for (i in categories) {
    const [_, __, data] = await findCategory(categories[i]);
    if (!data.length) {
      return false;
    }
  }
  return true;
};

/**
 * @param {*} req: request object
 * @param {*} res: respose object
 *
 * if category doesn't exist return error message.
 * if product exist return error message
 * else add product
 */
const addProduct = async (req, res) => {
  const { product_name, categories, price } = req.body;
  if (!product_name || !categories || !categories.length) {
    return res.status(productRequired.status).send(productRequired.response);
  }

  if (!(await categoriesExist(categories))) {
    return res.status(categoryExistErr.status).send(categoryNotFound.response);
  }

  let [err, data] = await findProduct(product_name);
  if (data.length) {
    return res.status(productExistErr.status).send(productExistErr.response);
  }

  let pro = new product({ categories, product: product_name, price });
  let [error, _] = await wait(pro.save, pro, lean);
  if (error) {
    console.error("Error in mongo:", err);
    return res.status(mongoError.status).send(mongoError.response);
  } else {
    return res.status(productCreated.status).send(productCreated.response);
  }
};

/**
 *
 * @param {*} req: request object
 * @param {*} res: responce object
 * get all products by categories
 * categories: Array
 */
const getProduct = async (req, res) => {
  const { categories } = req.body;
  if (!categories || !categories.length) {
    return res.status(categoryRequired.status).send(categoryRequired.response);
  }

  let find = { categories: { $in: categories } };
  let [err, data] = await wait(product.find, product, find, null, lean);
  if (err) {
    console.error("Error in mongo:", err);
    return res.status(mongoError.status).send(mongoError.response);
  } else {
    return res.status(productFind.status).send(data);
  }
};

/**
 * @param {*} req: request object
 * @param {*} res: respose object
 *
 * find and update product
 */
const updateProduct = async (req, res) => {
  const { product_name, product_update_name, price } = req.body;
  if (!product_update_name && !price) {
    return res.status().send();
  }

  let find = { product: product_name };
  let update = { $set: {} };
  if (product_update_name) {
    update["$set"]["product"] = product_update_name;
  } else if (price) {
    update["$set"]["price"] = price;
  }

  let [err, data] = await wait(product.updateOne, product, find, update);
  if (err) {
    console.error("error in mongoDB: ", err);
    return res.status(mongoError.status).send(mongoError.response);
  } else if (data["nModified"] == 0) {
    return res.status(productNotFound.status).send(productNotFound.response);
  } else {
    return res.status(productUpdated.status).send(productUpdated.response);
  }
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct
};
