#!/usr/bin/env node

import CLIApplication from './cli-application';
import CommandHelp from './cli-commands/command-help';
import GenerateCommand from './cli-commands/command-generate';

const myManager = new CLIApplication();
myManager.registerCommands([
  new CommandHelp,
  new GenerateCommand
]);

myManager.processCommand(process.argv);
