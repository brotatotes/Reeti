var ClarifaiService = require("./ClarifaiService.js");
var RecipeService = require("./RecipeService.js");
var ClarifaiStore = require("./ClarifaiStore.js");

function route(event, context, callback){
	switch(event.operation){
		case "ping":
		console.log("pong");
		break;
		case "get_ingredients":
		ClarifaiStore.getIngredients(event, context, callback);
		break;
		case "get_recipes":
		RecipeService.getRecipes(event, context, callback);
		break;
		default:
		callback(new Error("Unkown operation"));
		console.log("Unknown operation");
		break;
	}
}

module.exports = {
	route: route
}