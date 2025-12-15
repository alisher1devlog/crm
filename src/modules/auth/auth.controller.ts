import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { StaffLoginDto } from './dto/staff-login.dto';

@ApiTags('Auth tizimiga kirish!')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('super-admin/login')
  @ApiOperation({ summary: 'Super Admin uchun kirish' })
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xodimlar kirishi' })
  signInStaff(@Body() staffLoginDto: StaffLoginDto) {
    return this.authService.loginStaff(staffLoginDto);
  }
}
