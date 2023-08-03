import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { SettingsModule } from 'src/settings/settings.module';
import { Issue } from 'src/issues/entities/issue.entity';
import { CsvModule } from 'src/csv/csv.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Issue]),
    SettingsModule,
    CsvModule,
    LogsModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
