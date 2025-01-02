import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateToastParticipantDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  toastId!: string;
}
