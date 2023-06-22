import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Repository, FindOptionsWhere, Like, ILike } from 'typeorm';
import { Student } from './entities/student.entity';
import { SettingsService } from 'src/settings/settings.service';
import { Issue } from 'src/issues/entities/issue.entity';
import { CsvService } from 'src/csv/csv.service';
@Injectable()
export class StudentService {
  constructor(
    private readonly csvService: CsvService,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    private readonly settingService: SettingsService,
  ) {}

  async create(
    createStudentDto: CreateStudentDto,
    student_avatar?: Express.Multer.File,
  ) {
    const setting = await this.settingService.findOne();
    if (!setting) {
      throw new BadRequestException('initial setting must be created!!');
    }
    try {
      const email = createStudentDto?.collegeId
        ? `${createStudentDto.collegeId}${setting.emailSuffix}`
        : createStudentDto?.email;

      const avatar = student_avatar
        ? student_avatar.buffer.toString('base64')
        : null;
      const student = await this.studentRepository.save({
        ...createStudentDto,
        email,
        avatar,
      });
      return { ...student };
    } catch (err) {
      const ERR_ALREADY_EXIST = 19;
      if (err.errno === ERR_ALREADY_EXIST) {
        const errorColumn: keyof Student = err.message
          .split(':')
          .at(-1)
          .split('.')[1];
        switch (errorColumn) {
          case 'contactNumber':
            throw new BadRequestException('Contact number already exist.');
          case 'collegeId':
            throw new BadRequestException('College id already exist.');
        }
      }
    }
  }

  async addStudenBulk(csvFile: Express.Multer.File) {
    return await this.csvService.importDataFromCsv<Student>(
      csvFile,
      this.studentRepository,
      (data) => {
        Object.keys(data).forEach((key) => {
          if (key.trim() === 'sn') {
            console.log('this is sn');
            console.log('inside: ', data[key]);
          }
        });
        const student = new Student();
        student.collegeId = data.collegeId;
        student.name = data.name;
        student.email = data.email;
        student.contactNumber = data.contactNumber;
        return student;
      },
    );
  }

  async findAll({
    skip,
    limit,
    name,
    collegeId,
  }: {
    skip?: number;
    limit?: number;
    name?: string;
    collegeId?: string;
  }) {
    const where: FindOptionsWhere<Student>[] = [];
    // if (search) {
    //   where = [
    //     { name: ILike(`%${search}%`) },
    //     { collegeId: ILike(`%${search}%`) },
    //     { contactNumber: Like(`%${search}%`) },
    //   ];
    // }
    if (name) {
      where.push({ name: ILike(`%${name}%`) });
    }

    if (collegeId) {
      where.push({ collegeId: ILike(`${collegeId}`) });
    }
    const students = await this.studentRepository.find({
      where,
      skip,
      take: limit,
    });
    const total = await this.studentRepository.count();
    // const data = students.map((each) => ({
    //   ...each,
    //   email: each?.collegeId
    //     ? `${each.collegeId}${settings.emailSuffix}`
    //     : null,
    // }));
    return { total, data: students };
  }

  async findOne(id: string) {
    const settings = await this.settingService.findOne();
    const student = await this.studentRepository.findOne({
      where: { collegeId: id },
    });
    return {
      ...student,
      email: student?.collegeId
        ? `${student.collegeId}${settings.emailSuffix}`
        : null,
    };
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update({ id }, updateStudentDto);
  }

  async remove(id: string) {
    const issue = await this.issueRepo.findOne({
      where: {
        studentId: id,
      },
    });
    if (issue && !issue.returned) {
      throw new BadRequestException(
        'This student has issued book. This student cannot be deleted',
      );
    }
    return this.studentRepository.delete(id);
  }
}
