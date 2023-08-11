import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qntd: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
