const Product = require("../models/ProductsModel");
const Order = require("../models/Order");
const path = require("path");

const product_add = async (req, res) => {
  const product = await new Product(req.body).save();
  if (product) {
    res.status(200).json(product);
  } else {
    res
      .status(404)
      .json({ message: "Something went wrong, product not added!" });
  }
};

const upload_images = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file was uploaded" });
  }

  const files =
    req.files.file instanceof Array ? req.files.file : [req.files.file];
  //NB: You need to refactor this to check the file extensions
  const filesDetails = [];
  files.forEach((file) => {
    console.log(req.headers.uploadpath);
    file.mv(
      path.join(__dirname, `../../${req.headers.uploadpath}/${file.name}`),
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: err });
        }
      }
    );
    filesDetails.push({
      fileName: file.name,
      filePath: `/${req.headers.uploadpath}/${file.name}`,
    });
  });
  res.json(filesDetails);
};

const product_all = async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.status(200).json(products);
  } else {
    res
      .status(404)
      .json({ message: "Something went wrong, products not found!" });
  }
};

const product_single = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      message: "Something went wrong, product not found!",
    });
  }
};

const product_update = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (updateProduct) {
    res.status(200).json(updateProduct);
  } else {
    res.status(404).json({
      message: "Something went wrong, product not updated",
      updated: false,
    });
  }
};

const product_delete = async (req, res) => {
  const ordersAssociatedWithTheProduct = await Order.find({
    "orderItems.product": req.params.id,
  });

  ordersAssociatedWithTheProduct.forEach(async () => {
    await Order.deleteOne({
      "orderItems.product": req.params.id,
    });
  });

  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (deletedProduct) {
    res.status(200).json({
      message: "Product deleted",
      deleted: true,
    });
  } else {
    res.status(404).json({
      message: "Something went wrong, product not deleted!",
    });
  }
};

module.exports = {
  product_add,
  upload_images,
  product_all,
  product_single,
  product_update,
  product_delete,
};
