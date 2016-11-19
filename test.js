var app = require("./app.js");

function testGetIngredients(){

	var event = {
		"operation": "get_ingredients",
		"body-json":{
			"image": "https://samples.clarifai.com/metro-north.jpg",
			"access_token": "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"
		}
	}

	app.route(event, [], function(err, data){
		if (err){
			console.log("failed");
		}
		else{
			console.log(data);
		}
	})

}

function testGetRecipes(){

	var event = {
		"operation": "get_recipes",
		"body-json":{
			"ingredients": "potato lettuce"
		}
	}

	app.route(event, [], function(err, data){
		if (err){
			console.log("failed");
		}
		else{
			console.log(data);
		}
	})

}


function run(){
	// testGetIngredients();
	testGetRecipes();
}

run();