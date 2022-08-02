import { Router } from "express";
import { addProductIntoCart } from "../models/cart.js";
import { getValidToken } from "../models/token.js";

const cartRouter = new Router();

cartRouter.post("/add", async (request, response) => {
  const tokenId = req.headers.authorization;
  const userId = await getValidToken(tokenId).id;
  const productId = req.param.id;

  const addedProductCart = addProductIntoCart(userId, productId);

  response.status(201).send(addedProductCart);
});

cartRouter.post("/remove", (request, response) => {
  response.status(201).send("cart");
});
cartRouter.post("/total", (request, response) => {
  response.status(201).send("cart");
});

export default cartRouter;
