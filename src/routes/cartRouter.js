import { Router } from "express";
import { addProductIntoCart, removeProductFromCart, showCart, sumProductsFromCart } from "../models/cart.js";
import jwt from "jsonwebtoken";


const cartRouter = new Router();

cartRouter.post("/add/:id", async (req, res) => {   
  const token = req.headers.authorization;
  const validToken = jwt.verify(token, "meu_salt");
  const userId = validToken.userId;  
  const productId = req.params.id;
 
  const addedProductCart = await addProductIntoCart(userId, productId);
  
  res.status(201).send(addedProductCart);
});

cartRouter.post("/show", async (req, res) => {   
  const token = req.headers.authorization;
  const validToken = jwt.verify(token, "meu_salt");
  const userId = validToken.userId;  

  const Cart = await showCart(userId);
  
  res.status(201).send(Cart);
});

cartRouter.post("/remove/:id", async (req, res) => {
  const token = req.headers.authorization;
  const validToken = jwt.verify(token, "meu_salt");
  const userId = validToken.userId;  
  const productId = req.params.id;
 
  const addedProductCart = await removeProductFromCart(userId, productId);
  
  res.status(200).send(addedProductCart);
});

cartRouter.post("/total", async (req, res) => {
  const token = req.headers.authorization;
  const validToken = jwt.verify(token, "meu_salt");
  const userId = validToken.userId;  
  const cartSum = await sumProductsFromCart(userId)
  console.log(cartSum)
  
  res.status(200).send(`${cartSum}`);
});

export default cartRouter;
