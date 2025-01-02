import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateCriminalDto {
  @IsUUID()
  userId!: string;

  @IsBoolean()
  isPersonaNonGrata!: boolean;
}
