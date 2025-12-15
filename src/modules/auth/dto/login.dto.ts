import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@crm.uz', description: 'Super admin emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'JudaQiyinParol_2025',
    description: 'Super admin paroli',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
