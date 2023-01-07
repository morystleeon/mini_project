let models = require("../../models/index");
let validator = require("validatorjs");

async function getProduct(req, res) {
  try {
    let result = await models.Products.findAll({
      attributes: ["id", "name", "quantity", "price"],
    });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }
    res.json(result);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

async function getProductById(req, res) {
  try {
    let result = await models.Products.findOne({ where: { id: req.params.id } });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function createProduct(req, res) {
  try {
    let rules = {
      name: "required|min:3|max:50",
      quantity: "required|min:1",
      price: "required|min:10000|numeric",
    };
    let validation = new validator(req.body, rules);

    if (validation.passes()) {
      let createProduct = await models.Products.create(req.body);
      res.json({ message: "Product Added" });
    } else {
      return res.status(422).json({ errors: validation.errors.all() });
    }
  } catch (error) {
    res.json(error);
  }
}

async function updateProduct(req, res) {
  try {
    let result = await models.Products.findOne({ where: { id: req.params.id } });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }

    let updateProduct = await result.update(req.body);
    res.json(req.body);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

async function deleteProduct(req, res) {
  try {
    let deleteProduct = await models.Products.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Product Deleted", id: req.params.id });
  } catch (error) {
    res.json(error);
  }
}
module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
