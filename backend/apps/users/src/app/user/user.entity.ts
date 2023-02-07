import { User } from '@backend/shared-types';
import { genSalt, compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  public name: string;
  public email: string;
  public password: string;
  public isAdmin?: boolean;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      ...this
    }
  }

  public async hashPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }

  public fillEntity(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin ?? false;
  }
}
