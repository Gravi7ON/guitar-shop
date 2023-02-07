export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  DateBirthMature = 18,
  DateBirthMatureNotValid = 'The user date birth is not matureness'
}
