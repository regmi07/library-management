import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, FindOneOptions } from 'typeorm';
import { Category } from './entities/category.entity';
import { SubCategoryService } from 'src/sub-category/sub-category.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly subCategoryService: SubCategoryService,
  ) {}
  async createCategoryAndSubCategory(categoryDto: CreateCategoryDto) {
    const queryRunner =
      this.categoryRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const category = new Category();
      category.category = categoryDto.category;
      const createdCategory = await queryRunner.manager.save(category);

      // loop through sub category arrays and create each sub category
      categoryDto.subCategories.map(async (subCategory) => {
        await this.subCategoryService.createSubCategory({
          name: subCategory,
          category: createdCategory,
        });
      });

      await queryRunner.commitTransaction();
      return createdCategory;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll({
    limit,
    skip,
    search,
  }: {
    limit?: number;
    skip?: number;
    search?: string;
  }) {
    let where: FindOptionsWhere<Category> | FindOptionsWhere<Category>[] = null;
    if (search) {
      search = search.replace(/-/g, '');
      where = [{ category: ILike(`%${search}%`) }];
    }
    const [books, total] = await this.categoryRepository.findAndCount({
      skip,
      take: limit || 10,
      where,
      relations: {
        subCategories: true,
      },
    });
    return { total, data: books };
  }

  async findSubCategoryByCategory(categoryId: string) {
    const category = await this.categoryRepository.findOne({
      where: { catgory_id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const subcategories = await this.subCategoryService.findAll({ category });

    return subcategories;
  }

  findOne(categoryId: string, options?: FindOneOptions<Category>) {
    return this.categoryRepository.findOne({
      where: {
        catgory_id: categoryId,
      },
      ...options,
    });
  }
}
