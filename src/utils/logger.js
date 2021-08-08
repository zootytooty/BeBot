/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

function cleanMessage(message) {
  const conversation = JSON.parse(JSON.stringify(message));
  // Clean up the Wit attributes
  if (Object.prototype.hasOwnProperty.call(conversation, 'entities')) {
    delete conversation.entities;
  }
  if (Object.prototype.hasOwnProperty.call(conversation, 'traits')) {
    delete conversation.traits;
  }
  if (Object.prototype.hasOwnProperty.call(conversation, 'intents')) {
    delete conversation.intents;
  }

  // Facebook sends everything including keys. We don't want to store them
  delete conversation.context._adapter.options.access_token;
  delete conversation.context._adapter.options.verify_token;
  delete conversation.context._adapter.options.app_secret;

  return conversation;
}

const logConversation = async (message) => {
  const cleanedMessage = cleanMessage(message);
  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db('zootdb');
    const logs = db.collection('logs');

    const result = await logs.insertOne(cleanedMessage);
    return result;
  } catch (ex) {
    console.log(ex);
    return ex;
  } finally {
    await client.close();
  }
};

module.exports = logConversation;
