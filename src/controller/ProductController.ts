import { Request, Response } from "express";
import { IProduct } from "../@types/IProduct";
import { ProductService } from "../services/ProductService";

export class ProductController {
  private productService = new ProductService();

  async getAll(_, res: Response) {
    try {
      const product: IProduct[] = await this.productService.findAll();
      return res
        .status(200)
        .json({ type: "SUCESS", message: "PRODUCTS LIST OK", data: product });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, qntd } = req.body;
      const { categoryId } = req.params;

      if (!name || !qntd || !categoryId) {
        return res
          .status(401)
          .json({ type: "ERROR", message: "PARAMS NOT FOUND" });
      }

      const QNTD = parseFloat(qntd);
      const CategoryId = parseInt(categoryId);

      const product: IProduct = await this.productService.createProduct(
        name,
        QNTD,
        CategoryId
      );

      res
        .status(201)
        .json({ type: "SUCCESS", message: "Product create ", data: product });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ type: "ERROR", message: "ID NOT FOUND" });
      }

      const ID = parseInt(id);

      const product = await this.productService.removeProduct(ID);
      if (!product) {
        return res
          .status(400)
          .json({ type: "ERROR", message: "PRODUCT NOT FOUND" });
      }
      res
        .status(200)
        .json({ type: "SUCCESS", message: "PRODUCT DELETEDE SUCCESO" });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
  async getOneById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(404).json({ type: "ERROR", message: "ID NOT FOUND" });
      }

      const ID = parseInt(id);

      const product: IProduct = await this.productService.findOneById(ID);

      if (!product) {
        return res
          .status(400)
          .json({ type: "ERROR", message: "PRODUCT NOT FOUND" });
      }

      res.status(200).json({ type: "SUCCESS", data: product });
    } catch (err: any) {
      res.status(500).json({ type: "ERROR", message: err.message });
    }
  }
}
