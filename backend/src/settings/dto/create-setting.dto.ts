import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
  @ApiProperty({ example: 'iic.edu.np' })
  @IsString()
  @IsOptional()
  emailSuffix?: string;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  maxRenew?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsOptional()
  renewBefore?: number;

  @ApiProperty({ example: 'john' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsOptional()
  fineAmount?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
