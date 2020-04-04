const queryBuilder = require('../utils/query_builder')
const getGigs = require('../utils/get_gigs')

module.exports = controller => {
    controller.on('message,direct_message', async(bot, message) => {
        try {
            const response = await getGigs(queryBuilder(message))
            await bot.reply(message, response)
        } catch (e) {
            console.log(e)
        }
    })
}