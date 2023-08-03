import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('bulk')
  bulkCreate(
    // @Body(new ParseArrayPipe({ items: CreateBookDto })) datas: CreateBookDto[],
    @Body() datas: CreateBookDto[],
  ) {
    return this.bookService.createBookOnBulk(datas);
  }
  @ApiQuery({
    name: 'network',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    required: false,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Category id of the book',
  })
  @ApiQuery({
    name: 'subcategory',
    required: false,
    description: 'Subcategory id of the book',
  })
  @Get()
  search(
    @Query('network') searchIsbn?: string,
    @Query('limit') limit = 10,
    @Query('skip') skip = 0,
    @Query('isbn') isbn?: string,
    @Query('title') title?: string,
    @Query('authors') authors?: string,
    @Query('category') category?: string,
    @Query('subcategory') subcategory?: string,
  ) {
    if (searchIsbn) {
      return this.bookService.searchBook(searchIsbn.replace(/-/g, ''));
    } else {
      return this.bookService.findAll({
        limit,
        skip,
        isbn,
        title,
        authors,
        category,
        subcategory,
      });
    }
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.bookService.findOne(isbn, {
      relations: {
        category: true,
        subCategory: true,
      },
    });
  }

  @Patch(':isbn')
  update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(isbn, updateBookDto);
  }

  @Delete(':isbn')
  remove(@Param('isbn') isbn: string) {
    return this.bookService.remove(isbn);
  }
}
