import mongoose from "mongoose";

const CartModel = mongoose.model("Cart", {
  userId: String,
  products: Array,
});

export const addProductIntoCart = async (userId, product) => {
  const cart = new CartModel();

  cart.userId = userId;
  cart.products.push(product);

  await cart.save();

  return cart;
};
