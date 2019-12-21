/**
 * contains all code related to add, update categories
 * follow swagger file for api definations
 */

const category = require("../models/category");
const { wait } = require("../utils");
const {
  categoryNotFound,
  categoryExistErr,
  mongoError,
  categoryCreated,
  categoryRequired
} = require("../message");
const lean = {
  lean: true
};

/**
 * @param {*} parent_category:parent category name
 * @param {*} child_id: child category object id to be included in parent category
 *
 * In all parent categories add child category id
 */
const addChildCategories = async (parent_category, child_id) => {
  if (parent_category && parent_category.length > 1) {
    let find = { category: parent_category };
    let update = { $addToSet: { child_categories: child_id } };

    let [err, _] = await wait(category.updateMany, category, find, update);
    if (err) {
      console.error("Error in mongo:", err);
    }
  }
};

/**
 * @param {*} category_name: string
 * @param {*} parent_category: string
 *
 * insert category in collection and add child categories
 */
const insertCategory = async (category_name, parent_category) => {
  let Cat = new category({ category: category_name });
  if (parent_category) {
    Cat["parent_categories"] = parent_category;
  }

  let [err, data] = await wait(Cat.save, Cat, lean);
  if (err) {
    console.error("Error in mongo:", err);
    return [mongoError.status, mongoError.response];
  } else {
    console.info(`category created id: ${data._id}`);
    await addChildCategories(parent_category, data._id);

    return [categoryCreated.status, categoryCreated.response];
  }
};

/**
 * @param {*} category_name: string
 * @param {*} parent_category: string
 *
 * find and return categories documnent from collection.
 */
const findCategory = async (category_name, parent_category) => {
  let find = {};
  if (category_name) {
    find["category"] = category_name;
  }
  if (parent_category) {
    find["parent_categories"] = parent_category;
  }

  let [err, data] = await wait(category.find, category, find, null, lean);
  if (err) {
    console.error("Error in mongo:", err);
    return [mongoError.status, mongoError.response, null];
  } else if (data.length) {
    console.error(
      `category found for category_name: ${category_name} and parent_categories: ${parent_category}`
    );
    return [categoryExistErr.status, categoryExistErr.response, data];
  }

  return [categoryNotFound.status, categoryNotFound.response, data];
};

/**
 * @param {*} req: request object
 * @param {*} res: responce object
 *
 * get category api
 */
const getCategory = async (req, res) => {
  const { category_name, parent_category } = req.body;
  const [status, body, data] = await findCategory(
    category_name,
    parent_category
  );
  if (data) {
    return res.status(200).send(data);
  } else {
    return res.status(status).send(body);
  }
};

/**
 * @param {*} req: request object
 * @param {*} res: response object
 *
 * Check if category already exist, if it exist return error
 * else add category
 */
const addCategory = async (req, res) => {
  const { category_name, parent_category } = req.body;
  console.info(`adding category: ${category_name}`);

  if (!category_name) {
    return res.status(categoryRequired.status).send(categoryRequired.response);
  }

  const [status, body, data] = await findCategory(
    category_name,
    parent_category
  );
  if (data && data.length) {
    return res.status(status).send(body);
  }

  const [insertStatus, insertBody] = await insertCategory(
    category_name,
    parent_category
  );
  return res.status(insertStatus).send(insertBody);
};

module.exports = {
  getCategory,
  addCategory,
  findCategory
};
