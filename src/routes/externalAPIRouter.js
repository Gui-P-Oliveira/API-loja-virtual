import { Router } from "express";
import axios from "axios";
import { THIRD_URL, THIRD_PASS, THIRD_USER } from "../constants.js";
import pathLog from "../middleware/pathLog.js";
//Pode usar o service para isolar o axios e não ficar dependente aqui na rota

const externalAPIRouter = new Router();
const client = axios.create({
  baseURL: THIRD_URL,
});

let token = null;

externalAPIRouter.get("/products", async (req, res) => {
  if (!token) {
    const resLogin = await client.post("/login/", {
      username: THIRD_USER,
      password: THIRD_PASS,
    });

    token = resLogin.data.token;
  }

  const resProducts = await client.get("/product/", {
    headers: {
      Authorization: token,
    },
  });

  res.status(200).json(resProducts.data);
});

export default externalAPIRouter;
