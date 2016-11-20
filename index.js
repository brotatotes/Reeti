var app = require("./src/app.js");

exports.handler = function(event, context, callback){
  app.route(event, context, callback);
}