import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { Issue } from 'src/issues/entities/issue.entity';
import { IssuesService } from 'src/issues/issues.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly bookService: BookService,
    private readonly issueService: IssuesService,
    private readonly studentService: StudentService,
  ) {}
  async fetchMeta() {
    return {
      totalBooks: (await this.bookService.findAll({})).total,
      activeIssues: (await this.issueService.findBorrowedBooks()).length,
      totalExpired: (await this.issueService.findAll({})).data.filter(
        (each: any) =>
          each.isExpired === true && (each as Issue).returned === false,
      ).length,
      totalStudents: (await this.studentService.findAll({})).total,
      totalIssues: (await this.issueService.findAll({})).total,
      // studentWithActiveIssue: await this.issueService.findAll(),
    };
  }

  async fetchWeeklyIssueStats(month?: number, year?: number) {
    return this.issueService.getWeekelyStat(month, year);
  }
}
