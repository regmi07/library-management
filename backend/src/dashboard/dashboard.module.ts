import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { BookModule } from 'src/book/book.module';
import { IssuesModule } from 'src/issues/issues.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [BookModule, IssuesModule, StudentModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
