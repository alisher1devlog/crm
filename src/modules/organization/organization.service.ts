import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}
  async create(CreateOrganizationDto: CreateOrganizationDto) {
    const { name, address, logoUrl, adminFullName, adminPhone, adminPassword } =
      CreateOrganizationDto;

    const existOrg = await this.prisma.organization.findUnique({
      where: { name },
    });
    if (existOrg)
      throw new BadRequestException(
        `Bunday nomli tashkilot allaqachon mavjud!`,
      );

    const existStaff = await this.prisma.staff.findUnique({
      where: { phone: adminPhone },
    });
    if (existStaff) throw new BadRequestException(`Bu telefon raqam band!`);

    return this.prisma.$transaction(async (prisma) => {
      const newOrg = await prisma.organization.create({
        data: {
          name,
          address,
          logoUrl,
        },
      });

      const hashPassword = await bcrypt.hash(adminPassword, 10);

      const newAdmin = await prisma.staff.create({
        data: {
          firstName: adminFullName,
          lastName: '',
          phone: adminPhone,
          password: hashPassword,
          role: 'ADMIN',
          organizationId: newOrg.id,
        },
      });
      return {
        message: 'Tashkilot va Admin muvaffaqiyatli yaratildi!',
        organization: newOrg,
        admin: {
          id: newAdmin.id,
          phone: newAdmin.phone,
          role: newAdmin.role,
        },
      };
    });
  }

  async findAll() {
    return await this.prisma.organization.findMany({
      include: { staffs: true },
    });
  }

  async findOne(id: string) {
    try {
      const existOrg = await this.prisma.organization.findUnique({
        where: { id },
        include: { staffs: true },
      });
      if (!existOrg)
        throw new BadRequestException(`Bunday organization mavjud emas!`);

      return existOrg;
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.log(`Find one error:`, error);
      throw new InternalServerErrorException(`Tashkilotni topishda xatolik!`);
    }
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      await this.findOne(id);

      const { name, address, logoUrl } = updateOrganizationDto;

      return await this.prisma.organization.update({
        where: { id },
        data: { name, address, logoUrl },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.log(`Update Error;`, error);
      throw new InternalServerErrorException(
        `Tashkilotni yangilanishda xatolik!`,
      );
    }
  }
  async remove(id: string) {
    try {
      const existorg = await this.findOne(id);
      if (!existorg)
        throw new BadRequestException(`Bunday tashkilot mavjud emas`);

      const deletedOrg = await this.prisma.organization.delete({
        where: { id },
      });

      return {
        success: true,
        message: `Muvaffaqiyatli o'chirildi`,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      console.error('Remove Error:', error);
      throw new InternalServerErrorException("Tashkilotni o'chirishda xatolik");
    }
  }
}
