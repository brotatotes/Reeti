var request = require('request');
var IngredientList = require('./Ingredients.js');
var RecipeStore = require('./RecipeStore.js');

// var image = ""
// var image_test = "https://samples.clarifai.com/metro-north.jpg"
// //image will be the image we get from the user (twilio)
// var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"

function getIngredients(event, context, callback) {
    var url = "https://api.clarifai.com/v1/tag"
    var image_test = event['body-json'].image;
    var model = "food-items-v1.0"
    request.post({
        url: 'https://api.clarifai.com/v1/token/',
        form: {
            client_id: 'FmJqTvlxQB9NPoRiYBy4PgOrkMwWkTZbhPDqxp7k',
            client_secret: 'TKC16cTIq93C-Wd4X7graHIhQqhJynhsuj5ROmMk',
            grant_type: 'client_credentials',
        },
    }, function(err, response, body) {
        body = JSON.parse(body);
        console.log(body);
        var access_token = body['access_token'];
        request.get({
            url: url + "?" + "model=" + model + "&" + "url=" + image_test + "&" + "access_token=" + access_token
        }, function(err, response, body) {
            if (err) {
                callback(err);
            } else {
                body = JSON.parse(body);
                console.log(body);
                //console.log(body_json);
                // callback(null, body_json);
                filterData(body, event, context, callback);
            }
        })
    })
}

function filterData(data, event, context, callback) {
    var results = data.results[0].result;
    var zipped_data = [];
    // var threshold = .5;

    zipped_data = results.tag.classes.map(function(item, index) {
        return [item, results.tag.probs[index]];
    });

    zipped_data = zipped_data.filter(function(pair) {
        if (IngredientList.Ingredients_List.indexOf(pair[0]) !== -1) {
            return pair;
        }
    });

    // zipped_data = zipped_data.filter(function(pair){
    // 	if (pair[1] > threshold){
    // 		return pair
    // 	}
    // });
    if (zipped_data.length >= 3) {
        zipped_data = zipped_data.slice(0, 3);
    } else {
        zipped_data = zipped_data.slice(0, zipped_data.length);
    }

    // console.log("zipped data", zipped_data);

    // var search_string = "";

    // zipped_data.forEach(function(pair){
    // 	search_string = search_string + pair[0] + " ";
    // });

    var search_words = [];

    zipped_data.forEach(function(pair) {
        search_words.push(pair[0]);
    });

    console.log(search_words);

    RecipeStore.getRecipes(search_words, search_words.length, event, context, callback);
}

module.exports = {
    getIngredients: getIngredients
}
