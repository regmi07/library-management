import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { studentImageOptions } from 'src/utils/multer-options';
import { ConfigService } from '@nestjs/config';

@ApiTags('students')
@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!file)
          callback(
            new BadRequestException('File is not a valid image.'),
            false,
          );
        const validMimeTypes = ['image/jpeg', 'image/png'];
        if (validMimeTypes.find((mimeType) => mimeType === file.mimetype))
          callback(null, true);
        else
          callback(
            new BadRequestException('File is not a valid image.'),
            false,
          );
      },
    }),
  )
  create(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.studentService.create(createStudentDto, avatar);
  }

  // @Post('bulk')
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  // bulkCreate(@UploadedFile() studentCsv: Express.Multer.File) {
  //   return this.studentService.addStudenBulk(studentCsv);
  // }

  @Post('bulk')
  @UseInterceptors(FilesInterceptor('images', 500, studentImageOptions))
  bulkData(@UploadedFiles() images, @Body('datas') datas) {
    const datasInJson: CreateStudentDto[] = JSON.parse(datas);
    // return datas;
    return this.studentService.createStudentOnBulk(datasInJson, images);
  }

  // @Post('bulk')
  // bulkData(@Body() studentCsv: any[]) {
  //   return this.studentService.creareStudentOnBulk(studentCsv);
  // }

  @ApiQuery({
    name: 'limit',
    example: 20,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    example: 5,
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    example: 'np05',
    type: String,
    required: false,
  })
  @Get()
  findAll(
    @Query('limit') limit = 13,
    @Query('skip') skip = 0,
    @Query('name') name?: string,
    @Query('collegeId') collegeId?: string,
  ) {
    return this.studentService.findAll({ limit, skip, name, collegeId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
