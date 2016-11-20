var app = require("./app.js");

function testGetIngredients(){

	var event = {
		"operation": "get_ingredients",
		"body-json":{
			"image": "http://cdn1.theinertia.com/wp-content/uploads/2016/01/veggies.jpg",
			"access_token": "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"
		}
	}

	app.route(event, [], function(err, data){
		if (err){
			console.log("failed");
		}
		else{
			console.log(data.recipes[0]);
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
	testGetIngredients();
	//testGetRecipes();
}

run();