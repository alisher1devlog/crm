import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBranchesDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
