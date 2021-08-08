const { MongoClient } = require('mongodb');

const logConversation = async (conversation) => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
  });

  client.connect((err, db) => {
    if (err) throw err;
    const dbo = db.db('zootdb');

    dbo.collection('logs').insertOne(conversation, (error, res) => {
      if (error) throw error;
      console.log(res);
      db.close();
    });
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
  //   console.log(client, conversation);
};

module.exports = logConversation;
