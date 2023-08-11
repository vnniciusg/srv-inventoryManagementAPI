import * as express from "express";
import { CategoryController } from "../controller/CategoryController";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/v1/", categoryController.getAll);
router.get("/v1/:id", categoryController.getOneById);
router.post("/v1/", categoryController.create);
router.delete("/v1/:id", categoryController.delete);

export default router;
