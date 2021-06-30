const axios = require('axios');

const GIGS_API =
  'https://v3dl6mmgz1.execute-api.ap-southeast-2.amazonaws.com/dev/gigs';

const getGigs = async (query = {}) => {
  try {
    const response = await axios.get(GIGS_API, { params: query });

    if (!response.data || response.data.length === 0) {
      return "Aw man, there's nothing on!";
    }

    // Convert the gig info into "generic templates" for FB
    var attachment = {
      'type':'template',
      'payload':{
          'template_type':'generic',
          'elements': response.data.map(gigToTemplateElement)
      }
    };

    return attachment;
  } catch (e) {
    console.log(e);
    return 'Uh oh, an error occurred retrieving gig data.';
  }
};

function gigToTemplateElement(data) {
  return {
    title: data.title,
    image_url: data.image_url,
    subtitle: data.venue
  }
};

module.exports = getGigs;
