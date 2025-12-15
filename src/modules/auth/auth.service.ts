import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { StaffLoginDto } from './dto/staff-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: 'SUPER_ADMIN',
    };

    return {
      message: 'Muvaffaqiyatli kirildi',
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
      },
    };
  }

  async loginSuperAdmin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: 'SUPER_ADMIN',
    };

    return {
      message: 'Super Admin tizimga kirdi',
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: admin.id,
        email: admin.email,
        role: 'SUPER_ADMIN',
      },
    };
  }
  async loginStaff(staffLoginDto: StaffLoginDto) {
    const { phone, password } = staffLoginDto;

    const staff = await this.prisma.staff.findUnique({
      where: { phone },
    });

    if (!staff) {
      throw new UnauthorizedException('Telefon yoki parol xato!');
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Telefon yoki parol xato!');
    }

    const payload = {
      sub: staff.id,
      role: staff.role,
      organizationId: staff.organizationId,
    };

    return {
      message: 'Xodim tizimga kirdi',
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: staff.id,
        firstName: staff.firstName,
        role: staff.role,
        organizationId: staff.organizationId,
      },
    };
  }
}
