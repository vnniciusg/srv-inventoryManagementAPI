import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryService {
  private CategoryRepository = AppDataSource.getRepository(Category);

  async findAll() {
    return this.CategoryRepository.find();
  }

  async findOneById(id: number) {
    return this.CategoryRepository.findOne({ where: { id } });
  }

  async createCategory(name: string) {
    const category = Object.assign(new Category(), {
      name,
    });
    return this.CategoryRepository.save(category);
  }

  async removeCategory(id: number) {
    const category = await this.CategoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new Error("This category does not exist");
    }

    await this.CategoryRepository.remove(category);
    return "Category has been removed";
  }
}
