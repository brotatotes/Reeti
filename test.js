var app = require("./app.js");

var event = {
	"operation": "get_ingredients",
	"body-json":{
		"image": "https://samples.clarifai.com/metro-north.jpg",
		"access_token": "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"
	}
}

app.route(event, [], function(err, data){
	if (err){
		console.log("fuck");
	}
	else{
		console.log(data);
	}
})