import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoute.js";
import tagRouter from "./routes/tagRouter.js";
import { multerBrandStorage, multerCustomerStorage, multerProductStorage } from "./utility/storageManager.js";
import brandRouter from "./routes/brandRoutes.js";

// setup environment veriable
dotenv.config()
const port = process.env.PORT || 4040;

// Init express
const app = express();

// Use express middleware for manage form data
app.use(express.json());
app.use(express.urlencoded({extended : false }));
app.use(cors);

// Init router
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/brand', brandRouter);
app.use('/api/v1/tag', tagRouter);

// server listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgGreen.black);
});
