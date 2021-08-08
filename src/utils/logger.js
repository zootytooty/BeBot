const { MongoClient } = require('mongodb');

async function logConversation(conversation) {
  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const db = client.db('zootdb');
    const logs = db.collection('logs');

    const result = await logs.insertOne(conversation);

    console.log(result);
  } catch (ex) {
    console.log(ex);
  } finally {
    await client.close();
  }
}

module.exports = logConversation;
