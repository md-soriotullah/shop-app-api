import fs from "fs";
import path from "path";

// Destructuring module
const {readFileSync, writeFileSync} = fs;
const __dirname = path.resolve();

/**
 * @description Get All Product from json db
 * @name Get(/api/v1/product)
 * @access Private
 */
export const getAllProduct = (req, res) => {
    
    // get all data from json db
    const products = JSON.parse(readFileSync(path.join(__dirname, './db/products.json')));

    res.status(200).send(products);
};


/**
 * @description Add new product
 * @name Post(/api/v1/product)
 * @access Public
 */
export const AddNewProduct = (req, res) => {
    // get all data from json db
    const products = JSON.parse(readFileSync(path.join(__dirname, './db/products.json')));

    // Get Product data from request body
    const {photo, product_name, price} = req.body;

    // Validation and Add product
    if(!photo || !product_name || !price){
        res.status(400).json({
            message: 'photo, product_name & price all are required'
        });
    }else{
        // Push data to single product body
        products.push({
            id : (Date.now() + Math.ceil(Math.random() * 10000)).toString(),
            photo : photo,
            product_name : product_name,
            price : price
        });
    
        // Write new product to json database
        writeFileSync(path.join(__dirname, './db/products.json'), JSON.stringify(products));
    
        // Send Responce
        res.status(201).json({
            message : 'Product added successfull'
        });
    }
};


/**
 * @description Get single product
 * @name Get(/api/v1/product/:id)
 * @access Public
 */
export const getSingleProduct = (req, res) => {
    // get all data from json db
    const products = JSON.parse(readFileSync(path.join(__dirname, './db/products.json')));

    // Validate and get single product
    if(products.find(data => data.id == req.params.id)){
        // get single product
        const singleProduct = products.find(data => data.id == req.params.id);

        res.status(200).send(singleProduct);
    }else{
        res.status(404).json({
            message : 'Not found this product'
        });
    }
};


/**
 * @description Edit/ Update product
 * @name Put/Patch(/api/v1/product/:id)
 * @access Private
 */
export const UpdateProduct = (req, res) => {
    // get all Product from json db
    const products = JSON.parse(readFileSync(path.join(__dirname, './db/products.json')));

    // get requested product by params
    const requestedProduct = products.find(productData => productData.id == req.params.id);

    // Validation
    if(requestedProduct){
        products[products.findIndex(productsData => productsData.id == req.params.id)] = {
           ...products[products.findIndex(productsData => productsData.id == req.params.id)],
           ...req.body
        };

        // Write Updated data to json db
        writeFileSync(path.join(__dirname, './db/products.json'), JSON.stringify(products));

        res.status(200).json({
            message : 'Product Data Updated successfull'
        });
    }else{
        res.status(404).json({
            message : 'Not found this Item'
        });
    }
};


/**
 * @description Delete product Controller
 * @name Delete(/api/v1/product/:id)
 * @access Private
 */
export const deleteProduct = (req, res) => {
    // get all product from json db
    const products = JSON.parse(readFileSync(path.join(__dirname, './db/products.json')));

    // Detect targeted product
    const targetedProduct = products.some(data => data.id == req.params.id);

    // Validation
    if(targetedProduct){
        // Get all Product after filtering tergeted Product
        const newProducts = products.filter(data => data.id != req.params.id);

        // write filtered data to json db
        writeFileSync(path.join(__dirname, './db/products.json'), JSON.stringify(newProducts));

        res.status(200).json({
            message : 'Product Deleted successfull'
        });
    }else{
        res.status(404).json({
            message : 'Product not found thr server'
        });
    }
};