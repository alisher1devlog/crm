import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoomsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  branch_id: number;
}
