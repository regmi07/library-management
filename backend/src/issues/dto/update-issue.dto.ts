import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  returned?: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  renew?: boolean;
}
