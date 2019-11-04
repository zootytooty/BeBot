const moment = require('moment');

// let responses = require('../responses/responses')
let gigs = require('../service/get_gigs')

module.exports = function(controller) {

    controller.hears(['.*what.*','.*playing.*','.*gig.*','.*happening.*'], 'message_received', function(bot, message) {

        var todays_date = moment().format('YYYYMMDD')

        gigs.get_gigs(todays_date, function(err, showList) {
            
            if(!err){
                bot.reply(message, showList);
            } else {
                console.log(err)
                bot.reply(message, "Oh no something went wrong :'( ");
            }
        })

    });
};