import { Router } from "express";
import {
  findProductController,
  removeProductController,
  saveProductController,
  updateProductController,
} from "../controllers/productController.js";
import { v4 as uuidV4 } from 'uuid'

const productRouter = new Router();

productRouter.get("/:id?", findProductController);

productRouter.post("/", saveProductController);

productRouter.post("/:id/image/", async (req, res) => {
  if (!req.files) {
    res.status(400).send("not uploaded");
  }

  const fileId = uuidV4();
  const path = `./images/produtos/${fileId}`;

  req.files.thumbnail.mv(path, (error) => {
    if (error) {
      res.status(500).send("error");
      return;
    }

    saveImageProductPath(req.params.id, path);
    res.status(201).send("ok, uploaded");
  });
});

productRouter.put("/:id", updateProductController);

productRouter.delete("/:id", removeProductController);

export default productRouter;
