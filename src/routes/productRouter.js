import { Router } from "express";
import {
  findProductController,
  removeProductController,
  saveProductController,
  updateProductController,
} from "../controllers/productController.js";

const productRouter = new Router();

productRouter.get("/:id?", findProductController);

productRouter.post("/", saveProductController);

productRouter.put("/:id", updateProductController);

productRouter.delete("/:id", removeProductController);

export default productRouter;
