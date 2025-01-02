import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

export class CreateToastDto {
  @IsUUID()
  userId!: string;

  @IsDate()
  toastDate!: Date;

  @IsString()
  reason!: string;

  @IsString()
  drinks!: string;

  @IsString()
  foods!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  hasDone?: boolean;
}
