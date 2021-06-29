// Extracts entities from a wit enriched message and parses them into an object
// to be used as query strings when listing gigs

const moment = require('moment-timezone');

const timezone = 'Australia/Melbourne';

const getVenue = (message) => {
  const { traits } = message;

  if (!traits || !traits.venue) {
    return null;
  }
  return message.traits.venue[0].value;
};

const getDate = (message) => {
  const now = moment().format('YYYY-MM-DD');

  const { entities } = message;

  if (!entities) {
    return now;
  }

  const { 'wit$datetime:datetime': datetime } = entities;

  if (!datetime) {
    return now;
  }

  if (datetime[0].from) {
    return moment.tz(datetime[0].from.value, timezone).format('YYYY-MM-DD');
  }

  return moment.tz(datetime[0].value, timezone).format('YYYY-MM-DD');
};

const queryBuilder = (message) => {
  const venue = getVenue(message);
  const performanceDate = getDate(message);

  const query = { venue, performance_date: performanceDate };
  console.log(query);
  return query;
};

module.exports = queryBuilder;
