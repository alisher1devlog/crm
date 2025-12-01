import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchesDto } from './create.branches.dto';

export class UpdateBranchesDto extends PartialType(CreateBranchesDto) {}
