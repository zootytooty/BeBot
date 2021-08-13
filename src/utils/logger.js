/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

function cleanMessage(message) {
  // strip out wit data - it's on a wit sub document
  const { entities, traits, intents, ...safeMessage } = message;

  // clean the botkit context object. Adapter just gives us info from
  // the botkit facebook adapter. Nothing much useful except our crendentials
  // const { _adapter, ...safeContext } = context;
  delete safeMessage.context._adapter.options.access_token;
  delete safeMessage.context._adapter.options.verify_token;
  delete safeMessage.context._adapter.options.app_secret;

  // return { ...safeMessage, context: safeContext };
  return safeMessage;
}

const logConversation = async message => {
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
