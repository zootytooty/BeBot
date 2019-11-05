const request = require('request');

module.exports = {
	get_gigs: function(gig_date, venue = null, callback){

		if(venue=='all' || venue == null || venue == ''){
			var query_string = {
				performance_date: gig_date
			}
		} else {
			var query_string = {
				performance_date: gig_date,
				venue: venue
			}
		}		

		// Build out request options
		let options = {  
			url: 'https://4xo55t0ma9.execute-api.ap-southeast-2.amazonaws.com/dev/gigmanagement/getgigs',
			json: true,
			qs: query_string
		};

		request.get(options, function(err, res, body){
			if (!err && res.statusCode === 200 && body.length != 0) {

				var ArrShowInfo = [];
				for(var i = 0, len = body.length; i < len; i++){
					ArrShowInfo.push(show_info(body[i].title, body[i].venue, body[i].price));
				};

					return callback(null, ArrShowInfo.join("\r\n"));
			} else {
				return callback(null, "Sorry, there's no music");
			};
		});
	}
}






// Takes info about a specific show & preps the string for return
function show_info(title,venue,price){
    
    price = (price==null) ? "Free" : `$${price}`;
    show_string = `${venue}: ${title}, ${price}`;

    return show_string;
}
