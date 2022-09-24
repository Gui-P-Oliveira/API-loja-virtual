import mongoose from "mongoose";
import DBError from "../errors/dberror.js";

const ProductModel = mongoose.model("Product", {
  name: String,
  category: String,
  clientPrice: Number,
  custPrice: Number,
  thumbnail: String,
});

export const findProductById = async (id) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new DBError("Produto não encontrado.");
  } else {
    return product;
  }
};

export const findAllProducts = async () => {
  return await ProductModel.find().select();
};

export const saveNewProduct = async (name, category, price) => {
  const newProduct = new ProductModel({
    name,
    category,
    custPrice: price,
    clientPrice: price * 10,
  });

  await newProduct.save();

  return newProduct;
};

export const updateProduct = async (id, name, category, price) => {
  const product = await ProductModel.findById(id);

  if (product) {
    product.name = name;
    product.category = category;
    product.clientPrice = price * 5;
    product.custPrice = price;
    await product.save();
    return product;
  } else {
    throw new DBError("Produto não encontrado.");
  }
};

export const removeProduct = async (id) => {
  const product = await ProductModel.findByIdAndDelete(id);

  if (!product) {
    throw new DBError("Produto não encontrado.");
  } else {
    return product;
  }
};

export const saveImageProductPath = async (id, path) => {
  const product = await findProductById(id);

  product.thumbnail = path;

  return product;
};
