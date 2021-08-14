const logConversation = require('../utils/logger');

module.exports = async controller => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'hello') {
          const response =
            "Yo! Ask me what's on & then go check out some killer music.";

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
