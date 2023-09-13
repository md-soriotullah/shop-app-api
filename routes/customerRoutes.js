import express from "express";
import { AddCustomer, deleteCustomer, getAllCustomer, updateCustomerData } from "../controller/customerController.js";

const customerRouter = express.Router();

customerRouter.route('/').get(getAllCustomer).post(AddCustomer);
customerRouter.route('/:id').put(updateCustomerData).patch(updateCustomerData).delete(deleteCustomer)

// Export router
export default customerRouter;