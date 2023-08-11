import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Category } from "../entity/Category";

export class categoryController {
  private CategoryRepository = AppDataSource.getRepository(Category);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.CategoryRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const category = await this.CategoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      return "unregistered category";
    }
    return category;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { qntd, name } = request.body;

    const category = Object.assign(new Category(), {
      qntd,
      name,
    });

    return this.CategoryRepository.save(category);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let categoryToRemove = await this.CategoryRepository.findOneBy({ id });

    if (!categoryToRemove) {
      return "this category not exist";
    }

    await this.CategoryRepository.remove(categoryToRemove);

    return "category has been removed";
  }
}
