import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  category: Category;
}
