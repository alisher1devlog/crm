import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
          name: createBranchDto.name,
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

      console.error('Create Error:', error);
      throw new InternalServerErrorException('Branch yaratishda xatolik!');
    }
  }

  async findAll(organizationId: string) {
    const branches = this.prisma.branch.findMany({ where: { organizationId } } );
    console.log(branches)
    return branches || [];
  }

  async findOne(id: string, organizationId: string) {
    try {
      const branch = await this.prisma.branch.findFirst({where:{id, organizationId}})

      if(!branch) throw new NotFoundException('Filial topilmadi yoki sizga tegishli emas!')
        
      return branch
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.log(`FindOne error`, error)
      throw new InternalServerErrorException(`Filialni topishda xatolik`)
    }
  }

  async update(id: string, updateBranchDto: UpdateBranchDto, organizationId: string) {
    try {
      const branch = await this.prisma.branch.findFirst({where:{id, organizationId}})

      if(!branch) throw new NotFoundException('Filial topilmadi yoki sizga tegishli emas!')

      const updatedBranch = await this.prisma.branch.update({
        where: {id},
        data: updateBranchDto
      })
      return updatedBranch;
    } catch (error) {
      throw new InternalServerErrorException('Tahrirlashda xatolik')
    }
  }

  async remove(id: string, organizationId: string) {
    await this.findOne(id, organizationId);

    try {
      const deletedBranch = await this.prisma.branch.delete({
        where: { id },
      });
      return {
        success: true,
        message: 'muvaffaqiyatli ochirildi'
      }
    } catch (error) {
      throw new BadRequestException('Bu filialni o\'chira olmaysiz, chunki ichida ma\'lumotlar bor!');
    }
  }
}
