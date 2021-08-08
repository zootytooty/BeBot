const { MongoClient } = require('mongodb');

const logConversation = async (conversation) => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });
  // try {
  //   await client.connect();

  //   const db = client.db('zootdb');
  //   const logs = db.collection('logs');

  // //   const result = await logs.insertOne(conversation);

  //   return result;
  // } catch (ex) {
  //   console.log(ex);
  //   return ex;
  // } finally {
  //   await client.close();
  // }
  console.log(client, conversation);
};

module.exports = logConversation;
