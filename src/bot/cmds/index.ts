import * as TelegramBot from 'node-telegram-bot-api';
import CommandBase from './commandBase';
import HelpCommand from './help';
import IBANCommand from './iban';
import PostiCommand from './posti';
import WeatherCommand from './weather';

import DebugCommand from './debug';

const commands = [
  WeatherCommand,
  HelpCommand,
  DebugCommand,
  PostiCommand,
  IBANCommand,
];

export const cmdList: CommandBase[] = [];

export function getCommand(cmdName: string): CommandBase | undefined {
  return cmdList.find(x => x.name === cmdName);
}

export function load(bot: TelegramBot) {
  for (const Command of commands) {
    const cmd = new Command(bot);
    cmd.listen && cmd.listen();
    cmdList.push(cmd);
  }
}
