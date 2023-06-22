import { Book } from 'src/book/entities/book.entity';
import { Student } from 'src/student/entities/student.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  studentId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.issue, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Student, (student) => student.issue, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @Column({ default: false })
  returned: boolean;

  @Column({ default: 0 })
  fine: number;

  @Column({ default: 0 })
  totalRenew: number;

  @Column({ nullable: true, type: 'datetime' })
  latestRenewDate: Date;

  @CreateDateColumn()
  issueDate: Date;
}
