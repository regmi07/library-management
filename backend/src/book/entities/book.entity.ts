import { Category } from 'src/category/entities/category.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Book {
  @PrimaryColumn()
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;

  @Column()
  authors: string;

  @Column({ type: 'text', nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  publishedDate?: string;

  @Column({ nullable: true, default: 0 })
  totalCopies: number;

  @Column({ nullable: true, default: 0 })
  availableCopies: number;

  @Column({
    default:
      'https://assets.prod.abebookscdn.com/cdn/com/images/servlets/shared/search/no-image.gif',
  })
  image: string;

  @ManyToOne(() => Category, (category) => category.books, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.books, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @OneToMany(() => Issue, (issue) => issue.book, {
    onDelete: 'CASCADE',
  })
  issue: Issue[];
}
