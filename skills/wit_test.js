module.exports = function(controller, wit) {

    controller.hears(['gigs'], 'message_received', wit.hears, function (bot, message) {
        console.log("Wit.ai detected entities", message.entities);
        bot.startTyping(message);
        bot.reply(message, 'wits alive');
    });

}