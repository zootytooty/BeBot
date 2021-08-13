const getVenues = require('../utils/get_venues');
const logConversation = require('../utils/logger');

module.exports = async controller => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'venues') {
          const responses = await getVenues();

          await Promise.all([...responses.map(r => bot.reply(message, r))]);

          message.response = responses;
          const log = await logConversation(message);
          console.log(log);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
