const getVenues = require('../utils/get_venues');

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
          } else {
            await bot.reply(message, response);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
