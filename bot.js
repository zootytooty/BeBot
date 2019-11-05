/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

var env = require('node-env-file');
env(__dirname + '/.env');


// App requires 3 tokens:
//    - Facebook App Token
//    - Facebook Verify Token
//    - Wit AI Token
if (!process.env.page_token) {
  console.log('Error: Specify App token in environment');
  process.exit(1);
}

if (!process.env.verify_token) {
  console.log('Error: Specify verify token in environment');
  process.exit(1);
}

if (!process.env.wit_token) {
  console.log('Error: Specify wit in environment');
  process.exit(1);
}


// Create the Botkit controller, which controls all instances of the bot.
var Botkit = require('botkit');
var controller = Botkit.facebookbot({
  stats_optout: true,
  verify_token: process.env.verify_token,
  access_token: process.env.page_token
});

// Create WitAI instance for message routing
var wit = require('botkit-witai')({
  accessToken: process.env.wit_token,
  // minConfidence: 0.6,
  logLevel: 'debug'
});



// Set up an Express-powered webserver to expose oauth and webhook endpoints
var webserver = require(__dirname + '/components/express_webserver.js')(controller);

// Tell Facebook to start sending events to this application
require(__dirname + '/components/subscribe_events.js')(controller);

// Set up Facebook "thread settings" such as get started button, persistent menu
require(__dirname + '/components/thread_settings.js')(controller);

// Send an onboarding message when a user activates the bot
require(__dirname + '/components/onboarding.js')(controller);


// Tell botkit to route messages via Wit.AI prior to reponding
controller.middleware.receive.use(wit.receive)

// var normalizedPath = require("path").join(__dirname, "skills");
//   require("fs").readdirSync(normalizedPath).forEach(function(file) {
//   require("./skills/" + file)(controller, wit);
// });


// Main entry to return list of current gigs
const moment = require('moment');
let gigs = require('./service/get_gigs')
controller.hears(['events'], 'message_received', wit.hears, function (bot, message) {

  // Extract Date
  var date = moment().format('YYYYMMDD')
  if (message.entities.hasOwnProperty('datetime')) {
    // Extract returned Wit Date(time)
    wit_date = message.entities['datetime'][0]

    if (wit_date.hasOwnProperty('from')) {
      // If Wit returns a date AND time the response object looks different
      var date = moment(wit_date['from']['value']).format('YYYYMMDD')
  
    } else {
      // If Wit only returns a date, eg for today, tomorrow, next week etc
      var date = moment(wit_date['value']).format('YYYYMMDD');
    };
  };



  // Extract Venue
  var venue = null;
  if(message.entities.hasOwnProperty('venue')){
    var venue = message.entities['venue'][0]['value'];

    console.log('Selected venue is: ' + venue);
  };

  // Get list of application gigs
  gigs.get_gigs(date, venue, function(err, showList) {
      
      if(!err){
          bot.startTyping(message);
          bot.reply(message, showList);
      } else {
          console.log(err)
          bot.reply(message, "Oh no something went wrong :'( ");
      }
  })

});
