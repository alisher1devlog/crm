import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBranchDto: CreateBranchDto, organizationId: string) {
    try {
      const existBranch = await this.prisma.branch.findFirst({
        where: {
          name: CreateBranchDto.name,
          organizationId,
        },
      });
      if (existBranch) {
        throw new BadRequestException('Bu filial allaqachon mavjud!');
      }
      return this.prisma.branch.create({
        data: {
          name: createBranchDto.name,
          address: createBranchDto.address,
          organizationId,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.error('Remove Error:', error);
      throw new InternalServerErrorException('Branch yaratishda xatolik!');
    }
  }

  async findAll(organizationId: string) {
    return this.prisma.branch.findMany({
      where: { organizationId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} branch`;
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return `This action updates a #${id} branch`;
  }

  remove(id: number) {
    return `This action removes a #${id} branch`;
  }
}
