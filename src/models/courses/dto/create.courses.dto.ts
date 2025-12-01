import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoursesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  lavel: number;
  @IsString()
  @IsNotEmpty()
  duration_month: string;
  @IsNumber()
  @IsNotEmpty()
  branch_id: number;
}
