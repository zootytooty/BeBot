/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
               .-'''-.        .-'''-.           
              '   _    \     '   _    \         
            /   /` '.   \  /   /` '.   \        
           .   |     \  ' .   |     \  '        
           |   '      |  '|   '      |  '  .|   
           \    \     / / \    \     / / .' |_  
  .--------.`.   ` ..' /   `.   ` ..' /.'     | 
  |____    |   '-...-'`       '-...-'`'--.  .-' 
      /   /                              |  |   
    .'   /                               |  |   
   /    /___                             |  '.' 
  |         |                            |   /  
  |_________|                            `'-'   
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// This is the main file for the zoot bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const { MongoDbStorage } = require('botbuilder-storage-mongodb');
const { MongoClient } = require('mongodb');

// Import a platform-specific adapter for facebook.

const {
  FacebookAdapter,
  FacebookEventTypeMiddleware,
} = require('botbuilder-adapter-facebook');

// Load process.env values from .env file
require('dotenv').config();

// Import wit middleware
const wit = require('./middleware/wit-ai')({
  accessToken: process.env.WIT_TOKEN,
});

// code for upgraded mongodb storage package
let storage = null;
// GET MONGO Storage

// Create a MongoClient and connect it.
const mongoClient = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});
await mongoClient.connect();

// Grab a collection handle off the connected client
const collection = mongoClient.getCollection(mongoClient);

// Create a MongoDbStorage, supplying the collection to it.
storage = new MongoDbStorage(collection);

const adapter = new FacebookAdapter({
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  app_secret: process.env.FACEBOOK_APP_SECRET,
});

// emit events based on the type of facebook event being received
adapter.use(new FacebookEventTypeMiddleware());

const controller = new Botkit({
  webhook_uri: '/api/messages',
  adapter,
  storage,
});

if (process.env.CMS_URI) {
  controller.usePlugin(
    new BotkitCMSHelper({
      uri: process.env.CMS_URI,
      token: process.env.CMS_TOKEN,
    })
  );
}

// use middleware for any hits to the receive endpoint
controller.middleware.receive.use(wit.receive);

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(`${__dirname}/features`);

  /* catch-all that uses the CMS to trigger dialogs */
  if (controller.plugins.cms) {
    controller.on('message,direct_message', async (bot, message) => {
      let results = false;
      results = await controller.plugins.cms.testTrigger(bot, message);

      if (results !== false) {
        // do not continue middleware!
        return false;
      }

      return true;
    });
  }
});

controller.webserver.get('/', (req, res) =>
  res.send(`Beep bop boop, this is Zoot`)
);
