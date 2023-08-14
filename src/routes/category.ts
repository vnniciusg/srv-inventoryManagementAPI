import * as express from "express";
import { CategoryController } from "../controller/CategoryController";

const router = express.Router();
const categoryController = new CategoryController();

router.get("/", categoryController.getAll.bind(categoryController));
router.get("/:id", categoryController.getOneById.bind(categoryController));
router.post("/", categoryController.create.bind(categoryController));
router.delete("/:id", categoryController.delete.bind(categoryController));

export default router;
