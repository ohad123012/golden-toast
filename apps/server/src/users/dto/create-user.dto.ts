import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsBoolean()
  isAdmin!: boolean;
}
