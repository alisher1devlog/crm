import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  logoUrl?: string;

  @IsString()
  @IsNotEmpty()
  adminFullName: string;

  @IsString()
  @IsNotEmpty()
  adminPhone: string;

  @IsString()
  @MinLength(5)
  adminPassword: string;
}
