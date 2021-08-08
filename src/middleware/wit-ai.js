const { Wit, log } = require('node-wit');

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
const DEFAULT_LOG_LEVEL = 'error';

// not sure if we actually need this
// check if the message is generated from a button action
const isUserMessage = (message) =>
  message.text &&
  !message.bot_id &&
  !message.payload &&
  !message.attachments &&
  !message.quick_reply;

module.exports = ({ accessToken, logLevel = DEFAULT_LOG_LEVEL } = {}) => {
  if (!accessToken) {
    throw new Error('No wit.ai Access Token specified');
  }

  const logger = new log.Logger(
    LOG_LEVELS.includes(logLevel) ? logLevel : DEFAULT_LOG_LEVEL
  );

  const client = new Wit({ accessToken, logger });

  const middleware = {
    async receive(bot, message, next) {
      if (!isUserMessage(message)) {
        next();
      }

      try {
        const witData = await client.message(message.text);

        message.intents = witData.intents;
        message.entities = witData.entities;
        message.traits = witData.traits;
        message.wit = witData;
        next();
      } catch (e) {
        console.log(e);
        next();
      }
    },
  };

  return middleware;
};
