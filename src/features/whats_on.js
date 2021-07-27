const queryBuilder = require('../utils/query_builder');
const getGigs = require('../utils/get_gigs');

module.exports = async (controller) => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'whats_on') {
          const response = await getGigs(queryBuilder(message));

          console.log(response);

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
