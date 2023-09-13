// Package include
import multer from "multer";
import path from "path";
import randomId from "./randomIdGenarator.js";

const __dirname = path.resolve();

// Multer customer photo
export const multerCustomerStorage = () => {

    // multer diskStorage
    const customerStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, path.join(__dirname, './public/customer'));
        },
        filename : (req, file, cb) => {
            cb(null, randomId + file.originalname);
        }
    });

    // multer
    return multer({
        storage : customerStorage
    }).single('customer-photo');
};


// Multer product photo manage
export const multerProductStorage = () => {
    
    // Multer diskStorage
    const productStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, path.join(__dirname, './public/product'))
        },
        filename : (req, file, cb) => {
            cb(null, randomId + file.originalname)
        }
    });

    // Multer return config
    return multer({
        storage : productStorage
    }).single('product-photo')
};


// Multer setup for brand logo upload
export const multerBrandStorage = () => {

    // Multer diskStorage Setup
    const brandStorage = multer.diskStorage({
        destination : (req, res, cb) => {
            cb(null, path.join(__dirname, './public/brandImg'))
        },
        filename : (req, res, cb) => {
            cb(null, randomId + file.originalname)
        }
    });

    // Multer return config setup
    return multer({
        storage : brandStorage
    }).single('brand-photo')
};