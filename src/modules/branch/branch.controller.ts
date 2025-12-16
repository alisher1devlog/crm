import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('branch')
@UseGuards(AuthGuard('jwt'))
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post()
  create(@Body() createBranchDto: CreateBranchDto, @Req() req: any) {
    return this.branchService.create(createBranchDto, req.user.organizationId);
  }

  @Get('all')
  findAll(@Req() req: any) {
    return this.branchService.findAll(req.user.organizationId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.branchService.findOne(id,req.user.organizationId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto, @Req() req: any) {
    return this.branchService.update(id, updateBranchDto, req.user.organizationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req:any) {
    return this.branchService.remove(id,req.user.organizationId);
  }
}
