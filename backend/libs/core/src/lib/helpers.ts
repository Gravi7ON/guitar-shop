import { plainToInstance, ClassConstructor } from 'class-transformer';
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
