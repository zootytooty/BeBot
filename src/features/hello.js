const { MongoClient } = require('mongodb');
// const logConversation = require('../utils/logger');

module.exports = async (controller) => {
  controller.on(
    'message,direct_message,facebook_postback',
    async (bot, message) => {
      try {
        if (message.intents[0].name === 'hello') {
          const response =
            "Yo! Ask me what's on & then go check out some killer music.";

          message.response = response;

          // logConversation(message);
          // console.log(`Full Log: ${JSON.stringify(message)}`);
          const client = new MongoClient(process.env.MONGO_URI, {
            useUnifiedTopology: true,
          });

          await client.connect();

          const db = client.db('zootdb');
          const logs = db.collection('logs');

          const result = await logs.insertOne(message);

          console.log(result);

          await bot.reply(message, response);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
};
