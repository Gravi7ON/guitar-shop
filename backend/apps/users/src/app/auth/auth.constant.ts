export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  ForbiddenAdmin = 'There is only one admin may exists'
}

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
