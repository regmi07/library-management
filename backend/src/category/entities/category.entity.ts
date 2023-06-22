import { Book } from 'src/book/entities/book.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  catgory_id: string;

  @Column()
  category: string;

  @OneToMany(() => Book, (book) => book.category, {
    onDelete: 'CASCADE',
  })
  books: Book[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    onDelete: 'CASCADE',
  })
  subCategories: SubCategory[];
}
