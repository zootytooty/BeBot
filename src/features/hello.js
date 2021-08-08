const logConversation = require('../utils/logger');

module.exports = async (controller) => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'hello') {
          const response =
            "Yo! Ask me what's on & then go check out some killer music.";

          message.response = response;

          // console.log(`Full Log: ${JSON.stringify(message)}`);

          await bot.reply(message, response);
          logConversation(message);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
