import mongoose from "mongoose";
import DBError from "../errors/dberror.js";
import { findProductById } from "../models/product.js";

const CartModel = mongoose.model("Cart", {
  userId: String,
  products: Array,
});

export const addProductIntoCart = async (userId, productId) => {
  const product = await findProductById(productId);
  const userCart = await CartModel.findOne({ userId: userId });

  if (userCart !== null) {
    userCart.products.push(product);
    await userCart.save();
    return userCart;
  } else {
    const cart = new CartModel();

    cart.userId = userId;
    cart.products.push(product);

    await cart.save();
    return cart;
  }
};

export const showCart = async (userId) => {
  const userCart = await CartModel.findOne({ userId: userId });

  if (userCart !== null) {
    return userCart;
  }
};

export const removeProductFromCart = async (userId, productId) => {
  const userCart = await CartModel.findOne({ userId: userId });
  const productIndexToRemove = userCart.products.findIndex(
    (product) => product._id == productId
  );
  if (productIndexToRemove !== -1) {
    const cart = userCart.products;
    const productToRemove = cart[productIndexToRemove];

    cart[productIndexToRemove] = cart[cart.length - 1];

    cart[cart.length - 1] = productToRemove;

    cart.pop();

    await userCart.save();
  } else {
    throw new DBError();
  }
};

export const sumProductsFromCart = async (userId) => {
  const userCart = await CartModel.findOne({ userId: userId });
  let total = 0;
  userCart.products.forEach((product) => {
    total = total + product.clientPrice;
  });

  userCart.products = [];

  await userCart.save();

  return total;
};
