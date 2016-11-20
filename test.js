var ClarifaiStore = require('./scripts/ClarifaiStore.js');

function testClarifaiStore(){
	var event ={
		"body-json":{
			"image": "http://www.camerican.com/files/8812/8556/9526/iStock_000012105607XSmall.jpg"
		}
	};

	var context = [];

	ClarifaiStore.getIngredients(event, context, function(err, data){
		if (err){
			console.log(err);
		}
		else{
			console.log("RECIPE:", data);
		}
	});
}

function run(){
	testClarifaiStore();
}

run();