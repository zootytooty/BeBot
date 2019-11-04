module.exports = function(controller) {

     controller.hears(['test'], 'message_received', function(bot, message) {
        bot.startTyping(message);
        bot.reply(message, 'Im alive');
    });

}