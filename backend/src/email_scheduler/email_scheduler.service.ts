import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { IssuesService } from 'src/issues/issues.service';
import { getDateAfter } from 'src/utils/date-difference';

@Injectable()
export class EmailSchedulerService {
  constructor(
    private readonly emailService: EmailService,
    private readonly issueService: IssuesService,
  ) {}

  // run the cron jobs every midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendRemainderEmails() {
    const { overdueIssues, warningBefore } =
      await this.issueService.getOverdueIssues();
    for (const issue of overdueIssues) {
      const content = `Dear ${
        issue.student.name
      }\n\nThis is to remind you that book titled ${
        issue.book.title
      } which you have ${issue.latestRenewDate ? 'renewed' : 'issued'} on ${
        issue.latestRenewDate ? issue.latestRenewDate : issue.issueDate
      } is going to expire after ${warningBefore} days on ${getDateAfter(
        warningBefore,
      )}.\nPlease return or renew it as soon as possible to avoid fines.\n\nBest regards,\nIIC Library Team`;
      this.emailService.sendWarningMail(issue.student.email, content);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendBookExpiredEmail() {
    const { expiredIssues, expireDays } =
      await this.issueService.getExpiredIssues();
    for (const issue of expiredIssues) {
      const content = `Dear ${
        issue.student.name
      }\n\nThis is to remind you that book titled ${
        issue.book.title
      } which you have ${issue.latestRenewDate ? 'renewed' : 'issued'} on ${
        issue.latestRenewDate ? issue.latestRenewDate : issue.issueDate
      } has been expired today (${getDateAfter(
        expireDays,
      )}).\nYou will be fined immediately as per the library rules. Please return or renew it as soon as possible to avoid greater fines.\n\nBest regards,\nIIC Library Team`;
      this.emailService.sendExpiryMail(issue.student.email, content);
    }
  }
}
