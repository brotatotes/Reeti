var request = require('request');

function getRecipes(data, event, context, callback) {
	var apikey = '0d5c55d8bf4107263328e505a500e428';
	var service_url = 'http://food2fork.com/api/search/';
	var search = data;

	var url = service_url + search + '?key=' + apikey + '&q=' + search;
	var options = {
		url: url,
	};

	request.get(options, function(err, response, body) {
		if (err) {
			console.log(err);
			callback(err);
		} else {
			var body_json = JSON.parse(body);
			//console.log(body_json[0]);
			callback(null, body_json);
		}
	})
}


module.exports = {
	getRecipes: getRecipes
}
