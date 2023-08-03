import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  findAll() {
    return this.dashboardService.fetchMeta();
  }

  @Get('weekly-issue')
  getWeekelyIssueStats(@Query('month') month, @Query('year') year: number) {
    return this.dashboardService.fetchWeeklyIssueStats(
      month,
      year ?? new Date().getFullYear(),
    );
  }
}
