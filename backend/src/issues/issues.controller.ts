import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindBookDto } from './dto/find-book.dto';

@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @ApiQuery({
    name: 'studentId',
    example: 26031755,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'studentName',
    example: 'John Doe',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'bookIsbn',
    example: '9789111290',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'bookName',
    example: 'Rich dad Poor dad',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'categoryName',
    example: 'Programming',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'returned',
    example: true,
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    example: 5,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    example: 5,
    type: Number,
    required: false,
  })
  @Get()
  findAll(@Query() queryParams: FindBookDto) {
    return this.issuesService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('studentId') studentId: string) {
    return this.issuesService.findOne(+id, {
      where: {
        studentId,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }
}
