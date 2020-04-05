// Extracts entities from a wit enriched message and parses them into an object
// to be used as query strings when listing gigs

const moment = require('moment')

const getVenue = (message) => {
    if (!message.entities['venue']) {
        return
    }
    return message.entities['venue'][0]['value']
}

const getDate = (message) => {
    const datetime = message.entities['datetime']

    if (!datetime) {
        return moment().format('YYYYMMDD')
    }

    if (message.entities['datetime'][0]['from']) {
        return moment(message.entities['datetime'][0]['from']['value']).format('YYYYMMDD')
    }
    
    return message.entities['datetime'][0]['value']
}

const queryBuilder = (message) => {
    const venue = getVenue(message)
    const performance_date = getDate(message)

    return { venue, performance_date }
}

module.exports = queryBuilder
