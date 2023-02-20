import { CliCommandInterface } from './cli-command.interface';

export default class CommandHelp implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        'Программа для подготовки данных для REST API сервера.'
        'Пример:'
            'main.js --<command> [--arguments]'
        'Команды:'
            '--help:'                                  '# печатает этот текст'
            '--generate <n> <user service url>'       '# заполняет базу данных произвольным количеством информации и создает администратора с именем: admin, email: admin@email.local, паролем: admin1'
        `);
  }
}
