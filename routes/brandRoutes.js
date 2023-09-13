import experss from "express";
import { addNewBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "../controller/brandController.js";

const brandRouter = experss.Router();

brandRouter.route('/').get(getAllBrands).post(addNewBrand).get(getSingleBrand);
brandRouter.route('/:id').get(getSingleBrand).put(updateBrand).patch(updateBrand).delete(deleteBrand)

// export
export default brandRouter;