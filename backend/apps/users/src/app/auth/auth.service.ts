import { createEvent } from '@backend/core';
import { CommandEvent, User } from '@backend/shared-types';
import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthUserMessageException, RABBITMQ_SERVICE } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  async register(dto: CreateUserDto) {
    const user = dto;
    const existUser = await this.userRepository.findByEmail(user.email);

    if (existUser) {
      throw new ConflictException(AuthUserMessageException.Exists);
    }

    if (user.isAdmin) {
      if (await this.userRepository.findAdmin()) {
        throw new ForbiddenException(AuthUserMessageException.ForbiddenAdmin);
      }
    }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.password);

    const createdUser = await this.userRepository.create(userEntity);

    this.rabbitClient.emit(
      createEvent(CommandEvent.AddSubscriber),
      {
        loginLink: 'http://localhost:4200/login',
        email: user.email,
        password: user.password,
        name: user.name
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    const userEntity = new UserEntity(existUser);

    if (!await userEntity.comparePassword(password)) {
      throw new BadRequestException(AuthUserMessageException.PasswordWrong);
    }

    return userEntity.toObject();
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async findUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    return existUser;
  }

  async findAdmin() {
    const existAdmin = await this.userRepository.findAdmin();

    if (!existAdmin) {
      throw new NotFoundException(AuthUserMessageException.AdminNotFound);
    }

    return existAdmin;
  }
}
