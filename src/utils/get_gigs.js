const axios = require('axios')

const gigsEndpoint = 'https://4xo55t0ma9.execute-api.ap-southeast-2.amazonaws.com/dev/gigmanagement/getgigs'

const getGigs = async (query) => {
    try {
        const response = await axios.get(gigsEndpoint, { params: query })

        if (!response.data || response.data.length === 0) {
            return 'Aw man, there\'s nothing on!'
        }

        // summarise each gig in the response
        const gigs = response.data.map(gig => {
            return `${gig.venue}: ${gig.title}, ${!gig.price ? 'Free' : '$' + gig.price}`
        })

        return gigs.join("\r\n")
        
    } catch (e) {
        console.log(e)
        return 'Uh oh, an error occurred retrieving gig data.'
    }
}

module.exports = getGigs
