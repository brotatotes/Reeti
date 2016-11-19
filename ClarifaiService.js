var request = require('request');
// var image = ""
// var image_test = "https://samples.clarifai.com/metro-north.jpg"
// //image will be the image we get from the user (twilio)
// var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"

function getIngredients(event, context, callback){
	var url = "https://api.clarifai.com/v1/tag"
	var image_test = event['body-json'].image;
	var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"
	var model = "nsfw-v1.0"
	request.get({
		url: url + "?" + "model=" + model + "&" + "url=" + image_test + "&" + "access_token=" + access_token
	}, function(err, response, body) {
		if (err){
			callback(err);
		}
		else{
			var body_json = JSON.parse(body);
			console.log(body_json);
			callback(null, body_json);
		}
	})

}



module.exports = {
	getIngredients: getIngredients
}