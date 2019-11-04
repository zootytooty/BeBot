// controller.middleware.receive.use(wit.receive);


// /* note this uses example middlewares defined above */
// controller.hears(['gigs'], 'direct_message,direct_mention,mention', wit.hears, function(bot, message) {
//   bot.reply(message, 'Hello!');
// });

module.exports = function(controller) {

     controller.hears(['test'], 'message_received', function(bot, message) {
        bot.startTyping(message);
        bot.reply(message, 'Im alive');
    });

}