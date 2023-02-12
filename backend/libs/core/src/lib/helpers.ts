import { plainToInstance, ClassConstructor } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as mime from 'mime-types';
import { CommandEvent } from '@backend/shared-types'

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function createEvent(commandEvent: CommandEvent) {
  return {cmd: commandEvent};
}

export function imageFileFilter(_req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
}

export function editFileName(_req, file, callback) {
  const extension = mime.extension(file.mimetype);
  const fileName = crypto.randomUUID();
  callback(null, `${fileName}.${extension}`);
}
