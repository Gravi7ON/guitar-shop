import { fillObject } from '@backend/core';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreatedUserRdo } from './rdo/created-user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(CreatedUserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);

    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check-authorization')
  async checkAuthorization(@Request() req) {
    const userId = req.user.id;

    return fillObject(LoggedUserRdo, await this.authService.findUser(userId))
  }
}
