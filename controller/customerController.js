import fs from "fs";
import path from "path";

// Destructuring module
const {readFileSync, writeFileSync} = fs;
const __dirname = path.resolve();

/**
 * @description Get All Customer from json db
 * @name Get(/api/v1/customer)
 * @access Private
 */
export const getAllCustomer = (req, res) => {
    
    // get all data from json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, './db/customers.json')));

    res.status(200).send(customers);
};


/**
 * @description Add new customer
 * @name Post(/api/v1/customer)
 * @access Public
 */
export const AddCustomer = (req, res) => {
    // get all data from json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, './db/customers.json')));

    // Get data from request body
    const {name, email, cell, location} = req.body;

    if(!name || !email || !cell || !location){
        res.status(400).json({
            message : 'name, email, cell & location all are required'
        });
    }else{
        // Add new customer
      customers.push({
        id : (Date.now() + Math.ceil(Math.random() * 10000)).toString(),
        name : name,
        email : email, 
        cell : cell,
        location : location
    });

    // Write data to json database
    writeFileSync(path.join(__dirname, './db/customers.json'), JSON.stringify(customers));

    // Responce
    res.status(201).json({
        message : 'Customer added successfull'
    })
    }
};


/**
 * @description Edit/Updade Customer data
 * @name Put/Patch(/api/v1/customer/:id)
 * @access Private
 */
export const updateCustomerData = (req, res) => {
    // get all data from json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, './db/customers.json')));

    // Get requested customer
    const requestedCustomer = customers.find(customerData => customerData.id == req.params.id);

    // Validation
    if(requestedCustomer){
        customers[customers.findIndex(customerData => customerData.id == req.params.id)] = {
            ...customers[customers.findIndex(customerData => customerData.id == req.params.id)],
            ...req.body
        };
        // Write Edited data to json db
        writeFileSync(path.join(__dirname, './db/customers.json'), JSON.stringify(customers));

        res.status(200).json({
            message : 'Data updated successfull'
        })
    }else{
        res.status(404).json({
            message : 'Requested Data not found the server'
        });
    }
};


/**
 * @description Delete Customer
 * @name Delete(/api/v1/customer)
 * @access Private
 */
export const deleteCustomer = (req, res) => {
    // get all data from json db
    const customers = JSON.parse(readFileSync(path.join(__dirname, './db/customers.json')));

    //validation
    if(customers.some(data => data.id == req.params.id)){
        // Delete data to filtering process
        const NewAllCustomer = customers.filter(data => data.id != req.params.id);

        // Write New data to json db
        writeFileSync(path.join(__dirname, './db/customers.json'), JSON.stringify(NewAllCustomer));

        // Send responce
        res.status(200).json({
            message : 'Data deleted successfull'
        });
    }else{
        res.status(404).json({
            message : 'Data not found'
        })
    }
};