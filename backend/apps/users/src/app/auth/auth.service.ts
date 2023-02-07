import { User } from '@backend/shared-types';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthUserMessageException } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user: User = dto;

    const existUser = await this.userRepository.findByEmail(user.email);

    if (existUser) {
      throw new ConflictException(AuthUserMessageException.Exists)
    }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.password);

    const createdUser = await this.userRepository.create(userEntity);

    // if (createdUser.role === UserRole.Performer && createdUser.sendNotify) {
    //   this.rabbitClient.emit(
    //     createEvent(CommandEvent.AddSubscriber),
    //     {
    //       email: createdUser.email,
    //       name: createdUser.name
    //     }
    //   );
    // }

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
}
