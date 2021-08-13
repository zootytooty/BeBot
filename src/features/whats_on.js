const queryBuilder = require('../utils/query_builder');
const getGigs = require('../utils/get_gigs');
const logConversation = require('../utils/logger');

module.exports = async controller => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'whats_on') {
          const responses = await getGigs(queryBuilder(message));

          responses.forEach(async response => bot.reply(message, response));

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
