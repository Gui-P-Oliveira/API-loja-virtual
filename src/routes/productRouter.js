import { Router } from "express";
import {
  findProduct,
  removingProduct,
  saveProduct,
  updatingProduct,
} from "../controllers/productController.js";

const productRouter = new Router();

productRouter.get("/:id?", findProduct);

productRouter.post("/", saveProduct);

productRouter.put("/:id", updatingProduct);

productRouter.delete("/:id", removingProduct);

export default productRouter;
