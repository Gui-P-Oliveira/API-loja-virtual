import mongoose from "mongoose";

const ProductModel = mongoose.model("Product", {
  name: String,
  category: String,
  clientPrice: Number,
  custPrice: Number,
});

export const findProductById = async (id) => {
  const product = await ProductModel.findById(id);
  return product;
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
  }
};

export const removeProduct = async (id) => {
  const product = await ProductModel.findByIdAndDelete(id);
  return product
};
