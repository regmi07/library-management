import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = new SubCategory();
    subCategory.name = createSubCategoryDto.name;
    subCategory.category = createSubCategoryDto.category;
    await this.subCategoryRepository.save(subCategory);
    return subCategory;
  }

  async findAll({ category }: { category?: any }) {
    let where: FindOptionsWhere<SubCategory> | FindOptionsWhere<SubCategory>[] =
      null;

    if (category) where = [{ category }];

    const [subCategories, total] =
      await this.subCategoryRepository.findAndCount({ where });

    return { total, data: subCategories };
  }

  findOne(subCategoryId: string) {
    return this.subCategoryRepository.findOne({
      where: {
        subCategoryId,
      },
    });
  }
}
