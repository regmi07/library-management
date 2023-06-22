import { ApiProperty } from '@nestjs/swagger';
import { IsISBN, IsString } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty({ example: 'np05cp4s210025' })
  @IsString()
  studentId: string;

  @ApiProperty({ example: '9781797145105' })
  @IsISBN()
  bookId: string;
}
