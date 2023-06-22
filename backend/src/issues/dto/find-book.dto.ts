import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FindBookDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  bookIsbn?: string;

  @IsOptional()
  @IsString()
  bookName?: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  @IsString()
  studentName?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  @IsBoolean()
  returned?: boolean;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit = 10;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  skip = 0;
}
