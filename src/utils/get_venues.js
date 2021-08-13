const axios = require('axios');
const chunk = require('lodash/chunk');

const VENUES_API =
  'https://v3dl6mmgz1.execute-api.ap-southeast-2.amazonaws.com/dev/venues';

const venueToElement = data => ({
  title: data.name,
  image_url: data.image_url,
  subtitle: data.address,
  buttons: [
    {
      type: 'web_url',
      url: data.url,
      title: 'View Venue',
    },
  ],
});

const getVenues = async () => {
  try {
    const { data } = await axios.get(VENUES_API);

    // Facebook's generic message template accepts a max of 10 elements
    // split venues into chunks of 10 and return an array of messages to send
    const chunkyVenues = chunk(data, 10);

    const messages = chunkyVenues.map(venues => {
      const elements = venues.map(venueToElement);

      return {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements,
          },
        },
      };
    });

    return messages;
  } catch (ex) {
    console.log(ex);
    return ['Uh oh, an error occurred retrieving venues.'];
  }
};

module.exports = getVenues;
