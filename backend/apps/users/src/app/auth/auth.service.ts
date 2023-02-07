import { User } from '@backend/shared-types';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthUserMessageException } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
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
}
