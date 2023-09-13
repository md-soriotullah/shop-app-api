import express from "express";
import { AddNewProduct, UpdateProduct, deleteProduct, getAllProduct, getSingleProduct } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.route('/').get(getAllProduct).post(AddNewProduct);
productRouter.route('/:id').get(getSingleProduct).put(UpdateProduct).patch(UpdateProduct).delete(deleteProduct)

// export router
export default productRouter;