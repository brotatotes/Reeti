var request = require('request');

function getRecipes(data, n, event, context, callback) {
	if (n == 0) {
		callback(null, "I couldn't find any recipes.");
	}
	var apikey = '0d5c55d8bf4107263328e505a500e428';
	var service_url = 'http://food2fork.com/api/search/';
	var search_list = data;
	search_list = search_list.slice(0,n);
	// console.log("SEARCH_LIST", search_list, n);
	var search = "";
	search_list.forEach(function(word){
		search = search + word + " ";
	});

	var url = service_url + search + '?key=' + apikey + '&q=' + search;
	var options = {
		url: url,
	};
	// console.log("SEARCH:", search);
	request.get(options, function(err, response, body) {
		var body_json = JSON.parse(body);

		if (err) {
			// console.log(err);
			callback(err);
		} else if (body_json.count == 0) {
			getRecipes(data, n-1, event, context, callback);
		} else {
			callback(null, body_json);
		}
	})
}


module.exports = {
	getRecipes: getRecipes
}
