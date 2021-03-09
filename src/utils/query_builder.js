// Extracts entities from a wit enriched message and parses them into an object
// to be used as query strings when listing gigs

const moment = require('moment');

const getVenue = (message) => {
  const { traits } = message;

  if (!traits || !traits.venue) {
    return null;
  }
  return message.traits.venue[0].value;
};

const getDate = (message) => {
  const now = moment().format('YYYYMMDD');

  const { entities } = message;

  if (!entities) {
    return now;
  }

  const { 'wit$datetime:datetime': datetime } = entities;

  if (!datetime) {
    return now;
  }

  if (datetime[0].from) {
    return moment(datetime[0].from.value).format('YYYYMMDD');
  }

  return datetime[0].value;
};

const queryBuilder = (message) => {
  const venue = getVenue(message);
  const performanceDate = getDate(message);

  return { venue, performance_date: performanceDate };
};

module.exports = queryBuilder;
