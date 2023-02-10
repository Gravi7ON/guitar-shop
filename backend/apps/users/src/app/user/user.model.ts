import { Document } from 'mongoose';
import { User } from '@backend/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true
})
export class UserModel extends Document implements User {
  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public password: string;

  @Prop({
    default: false
  })
  public isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
