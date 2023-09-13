import express from "express";
import { addNewTags, deleteTag, getAllTags, updateTag } from "../controller/tagsController.js";

const tagRouter = express.Router();

tagRouter.route('/').get(getAllTags).post(addNewTags);
tagRouter.route('/:id').put(updateTag).patch(updateTag).delete(deleteTag)

//export router
export default tagRouter;