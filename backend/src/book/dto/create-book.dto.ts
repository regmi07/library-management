import { ApiProperty } from '@nestjs/swagger';
import {
  IsISBN,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({ example: '1212124321', type: 'isbn' })
  @IsISBN()
  @Transform(({ value }) => {
    if (typeof value === 'number') return value;
    return value.replace(/[\s-]/g, '');
  })
  isbn: string;

  @ApiProperty({ example: 'book title' })
  @IsString({ message: 'Title must not be empty.' })
  title: string;

  @ApiProperty({ example: 'book summary' })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiProperty({ example: 'author 1, author b, author z' })
  @IsString()
  authors: string;

  @ApiProperty({ example: 'number of total books' })
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value))
  totalCopies: number;

  @ApiProperty({ example: 'number of available books' })
  @IsNumber()
  @IsOptional()
  availableCopies?: number;

  @ApiProperty({ example: 'publisher' })
  @IsString()
  @IsOptional()
  publisher?: string;

  @ApiProperty({ example: 'publication date' })
  @IsString()
  @IsOptional()
  publishedDate?: string;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  category?: string;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  subCategory?: string;

  @ApiProperty({ example: 'https:google.com' })
  @IsString()
  @IsOptional()
  image: string;
}
