var request = require('request');
var IngredientList = require('./Ingredients.js');
var RecipeStore = require('./RecipeStore.js');

// var image = ""
// var image_test = "https://samples.clarifai.com/metro-north.jpg"
// //image will be the image we get from the user (twilio)
// var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"

function getIngredients(event, context, callback){
	var url = "https://api.clarifai.com/v1/tag"
	var image_test = event['body-json'].image;
	var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"
	var model = "food-items-v1.0"
	request.get({
		url: url + "?" + "model=" + model + "&" + "url=" + image_test + "&" + "access_token=" + access_token
	}, function(err, response, body) {
		if (err){
			callback(err);
		}
		else{
			var body_json = JSON.parse(body);
			console.log(body_json);
			// callback(null, body_json);
			filterData(body_json, event, context, callback);
		}
	})

}

function filterData(data, event, context, callback){
	var results = data.results[0].result;
	var zipped_data = [];
	var threshold = .5;
	//console.log('dude', IngredientList.Ingredients_List.indexOf('niggers'));
	zipped_data = results.tag.classes.map(function(item, index){
		return [item, results.tag.probs[index]];
	});

	zipped_data = zipped_data.filter(function(pair){
		if(IngredientList.Ingredients_List.indexOf(pair[0]) !== -1){
			return pair;
		}
	});

	zipped_data = zipped_data.filter(function(pair){
		if (pair[1] > threshold){
			return pair
		}
	});
	console.log("zipped data", zipped_data);

	var search_string = "";

	zipped_data.forEach(function(pair){
		search_string = search_string + pair[0] + " ";
	});

	console.log(search_string);

	RecipeStore.getRecipes(search_string, event, context, callback);
}

module.exports = {
	getIngredients: getIngredients
}
