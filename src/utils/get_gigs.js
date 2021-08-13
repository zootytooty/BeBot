const axios = require('axios');
const chunk = require('lodash/chunk');

const GIGS_API =
  'https://v3dl6mmgz1.execute-api.ap-southeast-2.amazonaws.com/dev/gigs';

const titleCase = str =>
  str
    .toLowerCase()
    .split('_')
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(' ');

const createSubtitle = gig => {
  const price = gig.price !== 0 && gig.price !== null ? `$${gig.price}` : 'Free';
  const line1 = `${titleCase(gig.venue)}, ${price}`;
  const line2 = `Doors: ${gig.doors_open}, Start: ${gig.music_starts}`;

  return `${line1}\n${line2}`;
};

const gigToElement = gig => ({
  title: gig.title !== null && gig.title !== '' ? gig.title : 'Unknown Title',
  image_url: gig.image_url,
  subtitle: createSubtitle(gig),
  buttons: [
    {
      type: 'web_url',
      url: gig.url,
      title: 'View Show',
    },
  ],
});

const getGigs = async (query = {}) => {
  try {
    const { data } = await axios.get(GIGS_API, { params: query });

    if (!data || data.length === 0) {
      return ["Aw man, there's nothing on!"];
    }

    // Facebook's generic message template accepts a max of 10 elements
    // split gigs into chunks of 10 and return an array of messages to send
    const chunkyGigs = chunk(data, 10);

    const messages = chunkyGigs.map(gigs => {
      const elements = gigs.map(gigToElement);

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
  } catch (e) {
    console.log(e);
    return ['Uh oh, an error occurred retrieving gig data.'];
  }
};

module.exports = getGigs;
