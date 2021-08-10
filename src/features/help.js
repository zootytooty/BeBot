const logConversation = require('../utils/logger');

module.exports = async (controller) => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'help') {
          const response = `Be bop zoot, here to help :) If you've found a bug, would like to request a feature or want to see what I can do, please headover to my homepage:
        
        https://zootytooty.github.io/zoothome/`;

          await bot.reply(message, response);

          message.response = response;
          const log = await logConversation(message);
          console.log(log);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
