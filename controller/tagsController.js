import fs from "fs";
import path from "path";
import randomId from "../utility/randomIdGenarator.js";

// Destructuring module
const {readFileSync, writeFileSync} = fs;
const __dirname = path.resolve();

/**
 * @description Get All Tags from json db
 * @name Get(/api/v1/tags)
 * @access Private
 */
export const getAllTags = (req, res) => {
    
    // get all data from json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, './db/tags.json')));

    res.status(200).send(tags);
};

/**
 * @description Create new tags
 * @name Post(/api/v1/tag)
 * @access Public
 */
export const addNewTags = (req, res) => {
    // get all data from json db
    const tags = JSON.parse(readFileSync(path.join(__dirname, './db/tags.json')));

    // Get data from request body
    const {name} = req.body;
    
    // push new data to tags
    if(name){
        tags.push({
            id : randomId,
            name : name
        });

        // write to json db
        writeFileSync(path.join(__dirname, './db/tags.json'), JSON.stringify(tags));

        res.status(201).json({
            message : 'Tag Added Successfull'
        });
    }else{
        res.status(400).json({
            message : 'Tag name are required. Example:- name : Apple'
        });
    }
};


/**
 * @description Update/ Edit tag name
 * @name Put/ Patch(/api/v1/tag/:id)
 * @access Private
 */
export const updateTag = (req, res) => {
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, './db/tags.json')));

    // get Targeted tag
    const tag = tags.find(data => data.id == req.params.id);

    // Validation
    if(tag){
        tags[tags.findIndex(data => data.id == req.params.id)] = {
            ...tags[tags.findIndex(data => data.id == req.params.id)],
            ...req.body
        }

        // write updated data to json db
        writeFileSync(path.join(__dirname, './db/tags.json'), JSON.stringify(tags));

        res.status(200).json({
            message : 'Tag name updated successfull'
        });
    }else{
        res.status(404).json({
            message : 'This tag is not founded here'
        });
    }  
};


/**
 * @description Delete Tag
 * @name Delete(/api/v1/tag/:id)
 * @access Public
 */
export const deleteTag = (req, res) => {
    // get all tags
    const tags = JSON.parse(readFileSync(path.join(__dirname, './db/tags.json')));

    const targetedTag = tags.some(data => data.id == req.params.id)

    // validation
    if(targetedTag){

        // get targeted tag
        const newTag = tags.filter(data => data.id != req.params.id);

        console.log(tags);

        writeFileSync(path.join(__dirname, './db/tags.json'), JSON.stringify(newTag));

        res.status(200).json({
            message : 'Tag deleted successfull'
        });
    }else{
        res.status(404).json({
            message : 'Tag not found'
        });
    }
};