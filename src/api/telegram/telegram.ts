import TelegramBot from 'node-telegram-bot-api';
import { env } from '../../config/env.js';
import { createLogger } from '../../logging/logger.js';

const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, { polling: false });

const logger = createLogger('telegram-bot-client');

export const sendTelegramBotMessage = (message: string) => {
  try {
    logger.info('Sending Telegram message: ' + message);
    bot.sendMessage(env.TELEGRAM_CHAT_ID, message);
  } catch (err) {
    logger.error('Error sending Telegram message: ' + err);
  }
};
