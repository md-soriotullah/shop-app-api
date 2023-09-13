import fs from "fs";
import path from "path";
import randomId from "../utility/randomIdGenarator.js";

const {readFileSync, writeFileSync} =fs;
const __dirname = path.resolve();

/**
 * @description Get All brands
 * @name Get(/api/v1/brand)
 * @access Public
 */
export const getAllBrands = (req, res) => {
    
    // Get All Brands data from json db
    const brands = JSON.parse(readFileSync(path.join(__dirname, './db/brands.json')));

    // responce
    res.status(200).send(brands);
};

/**
 * @description Add new brand
 * @name Get(/api/v1/brand)
 * @access Public
 */
export const addNewBrand = (req, res) => {
    // Get All Brands data from json db
    const brands = JSON.parse(readFileSync(path.join(__dirname, './db/brands.json')));

    // Get value from request body
    const {name, region, logo} = req.body; 

    // Validation & Push new brand data
    if(name, region, logo){
        brands.push({
            id : randomId,
            name,
            region,
            logo
        });

        // write data to json db
        writeFileSync(path.join(__dirname, './db/brands.json'), JSON.stringify(brands));

        res.status(201).json({
            message : 'Brand Added Successfull'
        })
    }else{
        res.status(400).json({
            message : 'name, region & logo all are required'
        })
    };

};


/**
 * @description Get single brand
 * @name Get(/api/v1/brand/:id)
 * @access Public
 */
export const getSingleBrand = (req, res) => {
    // Get All Brands data from json db
    const brands = JSON.parse(readFileSync(path.join(__dirname, './db/brands.json')));

    // get targeted brand
    const targatedBrand = brands.find(brandsData => brandsData.id == req.params.id);

    // Validation & responce
    if(targatedBrand){
        res.status(200).send(targatedBrand);
    }else{
        res.status(404).json({
            message : 'Unknown request. Data not found'
        });
    }
};

/**
 * @description Edit / Upadate brand data
 * @name Put / Patch(/api/v1/brand/:id)
 * @access Private
 */
export const updateBrand = (req, res) => {
    // Get All Brands data from json db
    const brands = JSON.parse(readFileSync(path.join(__dirname, './db/brands.json')));

    // get targated data
    const targatedBrand = brands.find(brandsData => brandsData.id == req.params.id);

    // Validation and update data
    if(targatedBrand){
        brands[brands.findIndex(data => data.id == req.params.id)] = {
            ...brands[brands.findIndex(data => data.id == req.params.id)],
            ...req.body
        }

        // Write data to json db
        writeFileSync(path.join(__dirname, './db/brands.json'), JSON.stringify(brands));

        res.status(200).json({
            message : 'Brand data updated successfull'
        });
    }else{
        res.status(404).json({
            message : 'Unknown request. Brand not found'
        });
    }
};


/**
 * @description Delete Brand
 * @name Delete(/api/v1/brand/:id)
 * @access Private
 */
export const deleteBrand = (req, res) => {
    // Get All Brands data from json db
    const brands = JSON.parse(readFileSync(path.join(__dirname, './db/brands.json')));

    // get targated data
    const targatedBrand = brands.find(brandsData => brandsData.id == req.params.id);

    // Validate & Delete
    if(targatedBrand){
        const remainingBrand = brands.filter(data => data.id != req.params.id);

        // Write remaining data to json db
        writeFileSync(path.join(__dirname, './db/brands.json'), JSON.stringify(remainingBrand));

        res.status(200).json({
            message : 'Brand Deleted successfull'
        })
    }else{
        res.status(404).json({
            message : 'Data not found'
        });
    }
};