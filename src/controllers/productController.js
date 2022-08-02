import { ProductDTO } from "../views/productDTO.js";
import {
  findProductById,
  findAllProducts,
  saveNewProduct,
  updateProduct,
  removeProduct,
} from "../models/product.js";

export const findProductController = async (req, res) => {
  const { id } = req.params;
  const product = await findProductById(id);

  if (!id) {
    const allProducts = await findAllProducts();
    const allProductsDTO = allProducts.map((prod) => new ProductDTO(prod));

    res.status(200).json(allProductsDTO);
    return;
  }

  if (!product) {
    res.status(404).send("Produto não listado");
    return;
  }

  const productDTO = new ProductDTO(product);

  return res.status(200).json(productDTO);
};

export const saveProductController = async (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !price || !category) {
    res.status(400).send("Falta parâmetros no corpo da requisição");
  }

  await saveNewProduct(name, category, price);

  res.status(201).send("Produto salvo");
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const updatedProduct = await updateProduct(id, name, category, price);

  if (!updatedProduct) {
    res.status(404).send("Produto não listado");
    return;
  }

  const updatedProductDTO = new ProductDTO(updatedProduct);

  res.status(201).json(updatedProductDTO);
};

export const removeProductController = async (req, res) => {
  const id = req.params.id;
  const removedProduct = await removeProduct(id);

  if (!removedProduct) {
    res.status(404).send("Produto não listado");
    return;
  }

  res.status(201).send("Produto removido");
};
