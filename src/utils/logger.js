/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');

function cleanMessage(message) {
  // strip out wit data - it's on a wit sub document
  const { entities, traits, intents, context, ...safeMessage } = message;

  // clean the botkit context object. Adapter just gives us info from
  // the botkit facebook adapter. Nothing much useful except our crendentials
  // const { _adapter, ...safeContext } = context;

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
