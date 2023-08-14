import * as express from "express";
import { ProductController } from "../controller/ProductController";

const router = express.Router();
const productController = new ProductController();

router.get("/", productController.getAll.bind(productController));
router.get("/:id", productController.getOneById.bind(productController));
router.post("/:categoryId", productController.create.bind(productController));
router.delete("/:id", productController.delete.bind(productController));

export default router;
