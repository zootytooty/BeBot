const getVenues = require('../utils/get_venues');
const logConversation = require('../utils/logger');

module.exports = async (controller) => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'venues') {
          const response = await getVenues();

          if (typeof response === 'object') {
            await bot.reply(message, {
              attachment: response,
            });

            message.response = response;
            const log = await logConversation(message);
            console.log(log);
          } else {
            await bot.reply(message, response);

            message.response = response;
            const log = await logConversation(message);
            console.log(log);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
