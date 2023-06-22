import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Issue } from 'src/issues/entities/issue.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';
import { CsvModule } from 'src/csv/csv.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Book, Issue]),
    CategoryModule,
    SubCategoryModule,
    CsvModule,
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
