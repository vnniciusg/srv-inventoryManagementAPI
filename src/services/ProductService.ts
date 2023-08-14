import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export class ProductService {
  private productService = AppDataSource.getRepository(Product);
  async findAll() {
    return this.productService.find();
  }

  async findOneById(id: number) {
    return this.productService.findOne({ where: { id } });
  }

  async createProduct(name: string, qntd: number, categoryId: number) {
    const product = Object.assign(new Product(), {
      name,
      qntd,
      categoryId,
    });
    return this.productService.save(product);
  }

  async removeProduct(id: number) {
    const product = await this.productService.findOne({ where: { id } });
    if (!product) {
      throw new Error("This product does not exist");
    }

    await this.productService.remove(product);
    return "Product has been removed";
  }
}
