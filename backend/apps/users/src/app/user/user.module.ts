import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  providers: [UserRepository],
  controllers: [],
  exports: [UserRepository],
})
export class UserModule {}
