const axios = require('axios');
const chunk = require('lodash/chunk');

const GIGS_API =
  'https://v3dl6mmgz1.execute-api.ap-southeast-2.amazonaws.com/dev/gigs';

function titleCase(str) {
  const strLowerCase = str.toLowerCase().replace('_', ' ');
  const wordArr = strLowerCase
    .split(' ')
    .map(
      currentValue => currentValue[0].toUpperCase() + currentValue.substring(1)
    );

  return wordArr.join(' ');
}

function createSubtitle(gig) {
  const line1 = `${titleCase(gig.venue)}, $${gig.price}`;
  const line2 = `Doors: ${gig.doors_open}, Start: ${gig.music_starts}`;

  return `${line1}\n${line2}`;
}

function gigToTemplateElement(data) {
  return {
    title: data.title,
    image_url: data.image_url,
    subtitle: createSubtitle(data),
    buttons: [
      {
        type: 'web_url',
        url: data.url,
        title: 'View Show',
      },
    ],
  };
}

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
      const elements = gigs.map(gigToTemplateElement);

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
