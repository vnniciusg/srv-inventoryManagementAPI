import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { ICategory } from "../@types/ICategory";

export class CategoryController {
  private categoryService = new CategoryService();

  async getAll(req: Request, res: Response) {
    try {
      const categories: ICategory[] = await this.categoryService.findAll();
      return res.status(200).json({ type: "SUCCESS", data: categories });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async getOneById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({ type: "ERROR", message: "ID NOT FOUND" });
      }
      const ID = parseInt(id);
      const category: ICategory = await this.categoryService.findOneById(ID);

      return res.status(200).json({ type: "SUCCESS", data: category });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(401).json({ type: "ERROR", message: "ID NOT FOUND" });
      }

      const category: ICategory = await this.categoryService.createCategory(
        name
      );
      console.log(category);

      return res.status(201).json({ type: "SUCCESS", data: category });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({ type: "ERROR", message: "ID NOT FOUND" });
      }
      const ID = parseInt(id);
      await this.categoryService.removeCategory(ID);

      return res
        .status(201)
        .json({ type: "SUCCESS", message: "CATEGORY IS BEEN REMOVED" });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
}
