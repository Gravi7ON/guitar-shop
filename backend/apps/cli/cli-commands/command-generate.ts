import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { fillDb } from '../../goods/prisma/seed';
import { CliCommandInterface } from './cli-command.interface';

const prisma = new PrismaClient();

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';

  public async execute(...parameters:string[]): Promise<void> {
    const [count, connectionString] = parameters;
    const admin = {
      name: 'admin',
      email: 'admin@email.local',
      password: 'admin1',
      isAdmin: true
    };

    try {
      await fillDb(Number(count))
        .then(async () => {
          await prisma.$disconnect()
        })
        .catch(async (err) => {
          console.error(err);
          await prisma.$disconnect()
          process.exit(1);
        })

      await axios.post(connectionString, admin);
    } catch {
      return console.log(`Can't fetch data from ${connectionString} or admin already exists.`);
    }

    console.log(`Db was filled and admin created with login: ${admin.email}, password: ${admin.password}`);
  }
}
