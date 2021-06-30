const queryBuilder = require('../utils/query_builder');
const getGigs = require('../utils/get_gigs');

module.exports = async (controller) => {
  controller.on('message,direct_message', async (bot, message) => {
    try {
      const response = await getGigs(queryBuilder(message));
      console.log(response);
      await bot.reply(message, response);
    } catch (e) {
      console.log(e);
    }
  });
};
