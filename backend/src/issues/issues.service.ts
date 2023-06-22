import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, Between } from 'typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './entities/issue.entity';
import { getDateAfter, getDateDifference } from 'src/utils/date-difference';
import { SettingEntity } from 'src/settings/entities/setting.entity';
import { Book } from 'src/book/entities/book.entity';
import { SearchParams } from './types/SearchParams.type';

@Injectable()
export class IssuesService {
  constructor(
    private readonly settingsService: SettingsService,
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const found = await this.issueRepo.findOne({
      where: {
        bookId: createIssueDto.bookId,
        studentId: createIssueDto.studentId,
        returned: false,
      },
    });
    if (found) {
      throw new BadRequestException('User has already borrowed this book');
    }
    const settings = await this.settingsService.findOne();

    const totalIssues = await this.issueRepo.find({
      where: { returned: false, studentId: createIssueDto.studentId },
    });

    if (totalIssues.length >= settings.maxIssue)
      throw new BadGatewayException(
        'User cannot borrow more than ' + settings.maxIssue + ' books.',
      );

    const books = await this.bookRepository.findOne({
      where: {
        isbn: createIssueDto.bookId,
      },
    });

    if (!books.availableCopies) {
      throw new BadGatewayException(
        `No copy of ${books.title} is currently available`,
      );
    }
    books.availableCopies--;

    const issue = this.issueRepo.create({
      ...createIssueDto,
    });
    // await this.bookService.updateAvailableBookCopy(createIssueDto.bookId);
    const issueDetails = await this.issueRepo.save(issue);
    await this.bookRepository.save(books);
    return issueDetails;
  }

  private fineCalculator(issue: Issue, settings: SettingEntity) {
    let diff = 0;
    let fine = 0;
    if (!issue.latestRenewDate) {
      diff = getDateDifference(issue.issueDate, new Date());
    } else {
      diff = getDateDifference(issue.latestRenewDate, new Date());
    }
    if (diff > settings.renewBefore) {
      fine = issue.fine + (diff - settings.renewBefore) * settings.fineAmount;
    }
    return fine;
  }

  findBorrowedBooks() {
    return this.issueRepo.find({
      where: {
        returned: false,
      },
    });
  }

  async findAll(searchParams: SearchParams) {
    // using query builder
    const queryBuilder = await this.issueRepo
      .createQueryBuilder('issue')
      .leftJoinAndSelect('issue.book', 'book')
      .leftJoinAndSelect('book.category', 'category')
      .leftJoinAndSelect('issue.student', 'student');

    if (searchParams.bookIsbn) {
      queryBuilder.andWhere('book.isbn LIKE :isbn', {
        isbn: `%${searchParams.bookIsbn}%`,
      });
    }

    if (searchParams.bookName) {
      queryBuilder.andWhere('book.title LIKE :bookName', {
        bookName: `%${searchParams.bookName}%`,
      });
    }

    if (searchParams.categoryName) {
      queryBuilder.andWhere('category.category LIKE :categoryName', {
        categoryName: `%${searchParams.categoryName}%`,
      });
    }

    if (searchParams.studentId) {
      queryBuilder.andWhere('student.collegeId LIKE :studentId', {
        studentId: `%${searchParams.studentId}%`,
      });
    }

    if (searchParams.studentName) {
      queryBuilder.andWhere('student.name LIKE :studentName', {
        studentName: `%${searchParams.studentName}%`,
      });
    }

    if (searchParams.returned !== undefined) {
      queryBuilder.andWhere('issue.returned = :returned', {
        returned: searchParams.returned,
      });
    }
    const [data, total] = await queryBuilder
      .take(searchParams.limit)
      .skip(searchParams.skip)
      .getManyAndCount();

    const settings = await this.settingsService.findOne();
    const extendedData: (Issue & {
      canRenew: boolean;
      expireDate: Date;
      isExpired: boolean;
    })[] = data.map((issue: Issue) => {
      let diff = 0;
      let expireDate: Date = null;
      if (!issue.latestRenewDate) {
        diff = getDateDifference(issue.issueDate, new Date());
        expireDate = getDateAfter(
          diff >= 0 ? settings.renewBefore - diff : settings.renewBefore,
        );
      } else {
        diff = getDateDifference(issue.latestRenewDate, new Date());
        expireDate = getDateAfter(
          diff >= 0 ? settings.renewBefore - diff : settings.renewBefore,
        );
      }
      if (!issue.returned) issue.fine = this.fineCalculator(issue, settings);

      if (issue.totalRenew >= settings.maxRenew || issue.returned)
        return {
          ...issue,
          canRenew: false,
          expireDate,
          isExpired: diff > settings.renewBefore,
        };
      else
        return {
          ...issue,
          canRenew: true,
          expireDate,
          isExpired: diff > settings.renewBefore,
        };
    });
    return { total, data: extendedData };
  }

  findOne(id: number, option?: FindOneOptions<Issue>) {
    // const { where, ...rest } = option;
    // return this.issueRepo.findOne({
    //   where: {
    //     id,
    //     ...where,
    //   },
    //   ...rest,
    // });
    return this.getExpiredIssues();
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    const issue = await this.issueRepo.findOne({
      where: { id, returned: false },
    });
    if (!issue) {
      throw new BadRequestException(`Issue with id ${id} is not active issue.`);
    }

    const settings = await this.settingsService.findOne();

    const fine = this.fineCalculator(issue, settings);

    if (fine !== 0) (updateIssueDto as Issue).fine = fine;

    if (updateIssueDto.renew) {
      delete updateIssueDto.renew; // delete this property as this in to required

      if (issue.totalRenew >= settings.maxRenew) {
        throw new BadRequestException(
          HttpStatus.BAD_REQUEST,
          'This book cannot be renewed.',
        );
      }

      (updateIssueDto as Issue).totalRenew = issue.totalRenew + 1;
      (updateIssueDto as Issue).latestRenewDate = new Date();
    }

    const updated = await this.issueRepo.update({ id }, updateIssueDto);

    if (updateIssueDto.returned) {
      const books = await this.bookRepository.findOne({
        where: {
          isbn: issue.bookId,
        },
      });

      books.availableCopies++;
      this.bookRepository.save(books);
    }

    if (updated.affected) {
      return {
        update: true,
        data: {
          issue,
          canRenew: issue.totalRenew < settings.maxRenew - 1,
          ...updateIssueDto,
        },
      };
    } else {
      return { update: false, data: null };
    }
  }

  async getOverdueIssues() {
    const settings = await this.settingsService.findOne();
    const currentDate = getDateAfter(
      settings.warningBeforeExpiry - settings.renewBefore,
    );
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    const overdueIssues = await this.issueRepo.find({
      where: [
        {
          issueDate: Between(startDate, endDate),
          totalRenew: 0,
        },
        {
          latestRenewDate: Between(startDate, endDate),
        },
      ],
      relations: {
        student: true,
        book: true,
      },
      select: {
        student: {
          name: true,
          email: true,
        },
        book: {
          isbn: true,
          title: true,
        },
      },
    });

    return { overdueIssues, warningBefore: settings.warningBeforeExpiry };
  }

  async getExpiredIssues() {
    const settings = await this.settingsService.findOne();
    const currentDate = getDateAfter(-settings.renewBefore);
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    const expiredIssues = await this.issueRepo.find({
      where: [
        {
          issueDate: Between(startDate, endDate),
          totalRenew: 0,
        },
        {
          latestRenewDate: Between(startDate, endDate),
        },
      ],
      relations: {
        student: true,
        book: true,
      },
      select: {
        student: {
          name: true,
          email: true,
        },
        book: {
          isbn: true,
          title: true,
        },
      },
    });

    return { expiredIssues, expireDays: settings.renewBefore };
  }
}
