import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Issue } from 'src/issues/entities/issue.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  collegeId: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  // @BeforeInsert()
  // @BeforeUpdate()
  // transformUndefinedToNull() {
  //   if (typeof this.avatar === 'undefined') {
  //     this.avatar = null;
  //   }
  // }
  avatar: string;

  @Column({ unique: true })
  contactNumber: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Issue, (issue) => issue.student, {
    onDelete: 'CASCADE',
  })
  issue: Issue[];
}
