import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private prisma: PrismaService) {}
  async create(createBranchDto: CreateBranchDto) {
    const existBranch = await this.prisma.branch.findFirst({
      where: { name: createBranchDto.name },
    });

    if (existBranch) {
      return new BadRequestException(`Branch name already exists`);
    }

    const newBranch = await this.prisma.branch.create({
      data: createBranchDto,
    });
    return newBranch;
  }

  async findAll() {
    try {
      const branches = await this.prisma.branch.findMany();
      if (branches.length === 0) {
        return new BadRequestException('No branches found');
      }
      return branches;
    } catch (e) {
      throw new BadRequestException('Failed to retrieve branches');
    }
  }

  async findOne(id: string) {
    try {
      const branch = await this.prisma.branch.findUnique({
        where: { id },
      });
      if (!branch) {
        return new BadRequestException('Branch not found');
      }
      return branch;
    } catch (e) {
      throw new BadRequestException('Failed to retrieve branch');
    }
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    try {
      const existBranch = this.prisma.branch.findUnique({
        where: { id },
      });
      if (!existBranch) {
        return new BadRequestException('Branch not found');
      }
      return this.prisma.branch.update({
        where: { id },
        data: updateBranchDto,
      });
    } catch (e) {
      throw new BadRequestException('Failed to update branch');
    }
  }

  async remove(id: string) {
    const existBranch = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!existBranch) {
      return new BadRequestException('Branch not found');
    }
    await this.prisma.branch.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Branch deleted successfully',
    };
  }
}
