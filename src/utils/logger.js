/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

// This doesn't work as expected & breaks the bot
// It's deleting important info from the reference object
// This should be a trival fix for anyone a little less spaz than me
// function clean_message(message) {
//   const conversation = message;
//   // Clean up the Wit attributes
//   if (Object.prototype.hasOwnProperty.call(conversation, 'entities')) {
//     delete conversation.entities;
//   }
//   if (Object.prototype.hasOwnProperty.call(conversation, 'traits')) {
//     delete conversation.traits;
//   }
//   if (Object.prototype.hasOwnProperty.call(conversation, 'intents')) {
//     delete conversation.intents;
//   }

//   // Facebook sends everything including keys. We don't want to store them
//   delete conversation.context._adapter.options.access_token;
//   delete conversation.context._adapter.options.verify_token;
//   delete conversation.context._adapter.options.app_secret;

//   return conversation;
// }

const logConversation = async (message) => {
  // const cleaned_message = clean_message(message);
  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('zootdb');
    console.log(message);
    return db;
    //   const logs = db.collection('logs');

    // //   const result = await logs.insertOne(conversation);

    //   return result;
  } catch (ex) {
    console.log(ex);
    return ex;
  } finally {
    await client.close();
  }
};

module.exports = logConversation;
