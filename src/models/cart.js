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
    (product) => product._id === productId
  );

  if (productIndexToRemove !== -1) {
    userCart.products.splice(productIndexToRemove, 1);

    await userCart.save();
  } else {
    throw new DBError();
  }
};

export const sumProductsFromCart = async (userId) => {
  const userCart = await CartModel.findOne({ userId: userId });

  const cartSum = userCart.products.reduce(
    (previousValue, currentValue) =>
      previousValue.clientPrice + currentValue.clientPrice
  );

  return String(cartSum);
};
