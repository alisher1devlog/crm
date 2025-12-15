import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class StaffLoginDto {
  @ApiProperty({ example: '+998901234567', description: 'Xodim telefoni' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password123', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
