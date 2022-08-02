import mongoose from "mongoose";
import { findProductById } from '../models/product.js'

const CartModel = mongoose.model("Cart", {
  userId: String,
  products: Array,
});

export const addProductIntoCart = async (userId, productId) => {
  const product = await findProductById(productId)
  const cart = new CartModel();

  cart.userId = userId;
  cart.products.push(product);

  await cart.save();

  return cart;
};
