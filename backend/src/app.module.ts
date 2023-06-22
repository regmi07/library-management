import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { SettingsModule } from './settings/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesModule } from './issues/issues.module';
import { BookModule } from './book/book.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulerService } from './email_scheduler/email_scheduler.service';
import { CsvService } from './csv/csv.service';
import { CsvModule } from './csv/csv.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'lms',
      entities: [`${__dirname}/**/entities/*.*.js`],
      synchronize: true,
    }),
    StudentModule,
    SettingsModule,
    IssuesModule,
    BookModule,
    DashboardModule,
    CategoryModule,
    SubCategoryModule,
    EmailModule,
    CsvModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    EmailSchedulerService,
    CsvService,
  ],
})
export class AppModule {}
