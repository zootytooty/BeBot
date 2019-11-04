const moment = require('moment');
const request = require('request');

module.exports = {
	get_gigs: function(gig_date, callback){

		// Build out request options
		let options = {  
			url: 'https://4xo55t0ma9.execute-api.ap-southeast-2.amazonaws.com/dev/gigmanagement/getgigs',
			json: true,
			qs:{
				performance_date: gig_date
			}
		};

		request.get(options, function(err, res, body){
			if (!err && res.statusCode === 200) {

				var ArrShowInfo = [];
				for(var i = 0, len = body.length; i < len; i++){
					ArrShowInfo.push(show_info(body[i].title, body[i].venue, body[i].price));
				};

					return callback(null, ArrShowInfo.join("\r\n"));
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
