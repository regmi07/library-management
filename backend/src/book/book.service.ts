import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

import { findBookFromInternet } from './utils/find-book';
import { CategoryService } from 'src/category/category.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubCategoryService,
    private readonly logService: LogsService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = await this.bookRepo.findOne({
        where: { isbn: createBookDto.isbn },
      });
      if (book)
        throw new Error(
          `${createBookDto.isbn} -> ${createBookDto.title} Book already exists on the database!`,
        );

      // const category = await this.categoryService.findOne(
      //   createBookDto.category,
      // );
      // if (!category)
      //   throw new Error(
      //     `${createBookDto.isbn} -> ${createBookDto.title} Invalid category ${createBookDto.category}!! Please select the valid category!`,
      //   );

      // const subCategory = await this.subCategoryService.findOne(
      //   createBookDto.subCategory,
      // );
      // if (!subCategory)
      //   throw new Error(
      //     `${createBookDto.isbn} -> ${createBookDto.title} Invalid sub category ${createBookDto.subCategory}!! Please select the valid sub category!`,
      //   );

      if (!createBookDto.availableCopies) {
        createBookDto.availableCopies = createBookDto.totalCopies;
      }

      return await this.bookRepo.save({
        ...createBookDto,
      });
    } catch (error) {
      throw error;
    }
  }

  /* 
    - get a category by name
    - get a sub category by name
    - create a book object (or something)
    - return that book object
  */

  async createBookOnBulk(datas: any[]) {
    let message = '';
    let successCount = 0;

    for (const book of datas) {
      try {
        const typed_book: CreateBookDto = book;
        await this.create(typed_book);
        successCount++;
      } catch (err) {
        // message += `${err.parameters[0]} ${
        //   err.parameters[1]
        // } -> ${err.driverError.toString()}\n`;
        // console.log(message);
        message += `${err.message}\n`;
      }
    }

    if (datas.length == successCount) {
      return await this.logService.create({
        message: 'All the books were added to database successfully',
        status: 'success',
      });
    } else if (successCount) {
      await this.logService.create({
        message: `Following books failed to be added on database: \n${message}`,
        status: 'error',
      });
      return {
        message: `${successCount} books has been added to database and  ${
          datas.length - successCount
        } books failed to be added on database. Please view the logs to find out more information.`,
      };
    } else {
      await this.logService.create({
        message: `All the books failed to be added on database: \n${message}`,
        status: 'error',
      });

      return {
        message:
          'All the books failed to be added on database. Please view logs to find out more information',
      };
    }
  }

  async searchBook(isbn: string) {
    const data = await findBookFromInternet(isbn, this.httpService.axiosRef);
    return data;
  }

  async findAll({
    limit,
    skip,
    isbn,
    title,
    authors,
    category,
    subcategory,
  }: {
    limit?: number;
    skip?: number;
    isbn?: string;
    title?: string;
    authors?: string;
    category?: string;
    subcategory?: string;
  }) {
    const queryBuilder = this.bookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.category', 'category')
      .leftJoinAndSelect('book.subCategory', 'subcategory');

    if (isbn) {
      isbn = isbn.replace(/-/g, '');

      queryBuilder.andWhere('book.isbn LIKE :isbn', { isbn: `%${isbn}%` });

      // queryBuilder.andWhere(
      //   new Brackets((qb) => {
      //     qb.where('book.title LIKE :search', {
      //       search: `%${search}%`,
      //     })
      //       .orWhere('book.isbn LIKE :search', { search: `%${search}%` })
      //       .orWhere('book.summary LIKE :search', { search: `%${search}%` });
      //   }),
      // );
    }

    if (title) {
      queryBuilder.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }

    if (authors) {
      queryBuilder.andWhere('book.authors LIKE :authors', {
        authors: `%${authors}%`,
      });
    }

    if (category) {
      queryBuilder.andWhere('category.category LIKE :category', {
        category: `%${category}%`,
      });
    }

    if (subcategory) {
      queryBuilder.andWhere('book.subCategory LIKE :subcategory', {
        subcategory: `%${subcategory}%`,
      });
    }

    const [books, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { total, data: books };
  }

  findOne(isbn: string, options?: FindOneOptions<Book>) {
    return this.bookRepo.findOne({
      where: {
        isbn,
      },
      ...options,
    });
  }

  async update(isbn: string, updateBookDto: UpdateBookDto) {
    // const category = await this.categoryService.findOne(updateBookDto.category);
    // if (!category)
    //   throw new BadRequestException(
    //     HttpStatus.BAD_REQUEST,
    //     'Invalid category!! Please select valid category',
    //   );

    // const subCategory = await this.subCategoryService.findOne(
    //   updateBookDto.subCategory,
    // );
    // if (!subCategory)
    //   throw new BadRequestException(
    //     HttpStatus.BAD_REQUEST,
    //     'Invalid sub category!! Please select valid sub category',
    //   );

    const book = await this.bookRepo.findOne({ where: { isbn } });

    const updated = await this.bookRepo.update(
      { isbn },
      {
        ...updateBookDto,
        // category,
        // subCategory,
        availableCopies:
          book.availableCopies + (updateBookDto.totalCopies - book.totalCopies),
      },
    );
    if (updated.affected)
      return { message: 'book updated successfully.', success: true };
    else return { message: 'book update failed', success: false };
  }

  async remove(isbn: string) {
    const issue = await this.issueRepo.findOne({
      where: {
        bookId: isbn,
      },
    });

    if (issue && !issue.returned) {
      throw new BadRequestException(
        'The book cannot be deleted. This book is issued currently',
      );
    }

    const deleted = await this.bookRepo.delete(isbn);
    if (deleted.affected)
      return { message: 'book deleted successfully', success: true };
    else return { message: 'book delete failed.', success: false };
  }
}
