const product = require("../models/product");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("product created successfully");
    } catch (e) {
      res.status(500).json(e + " failed to product create");
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (e) {
      res.status(500).json(e + "   failed to get all products");
    }
  },

  getProductByID: async (req, res) => {
    const productId = req.params.id;
    try {
      const Product = await product.findById(productId);
      const { _v, createdAt, ...productData } = Product._doc;
      res.status(200).json(productData);
    } catch (e) {
      res.status(500).json("Product not found or " + e.message);
    }
  },

  searchProduct: async (req, res) => {
    try {
      const result = await product.aggregate([
        {
          $search: {
            index: "shoes",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e + " failed to get the products");
    }
  },
};
