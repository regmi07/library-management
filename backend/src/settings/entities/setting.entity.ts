import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '@iic.edu.np' })
  emailSuffix: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 2 })
  maxRenew: number;

  @Column({ default: 2 })
  maxIssue: number;

  @Column({ default: 7 })
  renewBefore: number;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ default: 'john' })
  firstName: string;

  @Column({ default: 'doe' })
  lastName: string;

  @Column({ default: 5 })
  fineAmount: number;

  @Column({ default: 2 })
  warningBeforeExpiry: number;
}
