const axios = require('axios');

const VENUES_API =
  'https://v3dl6mmgz1.execute-api.ap-southeast-2.amazonaws.com/dev/venues';

function venueToTemplateElement(data) {
  return {
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
  };
}

const getVenues = async () => {
  try {
    const response = await axios.get(VENUES_API);

    // Convert into "generic templates" for FB
    const attachment = {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: response.data.map(venueToTemplateElement),
      },
    };

    return attachment;
  } catch (ex) {
    console.log(ex);
    return 'Uh oh, an error occurred retrieving venues.';
  }
};

module.exports = getVenues;
