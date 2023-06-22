import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategoryAndSubCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategoryAndSubCategory(createCategoryDto);
  }

  @Get()
  async searchCategories(
    @Query('limit') limit?: number,
    @Query('skip') skip?: number,
    @Query('search') search?: string,
  ) {
    return this.categoryService.findAll({ limit, skip, search });
  }

  @Get('sub-category-by-category/:id')
  async findSubCategoryByCategory(@Param('id') id: string) {
    return this.categoryService.findSubCategoryByCategory(id);
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.findOne(id, {
      relations: {
        subCategories: true,
      },
    });
  }
}
