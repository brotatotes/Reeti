var ClarifaiService = require("./ClarifaiService.js");

function route(event, context, callback){
	switch(event.operation){
		case "get_ingredients":
		ClarifaiService.getIngredients(event, context, callback);
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