var express = require('express');
var router = express.Router();
var twillio = require('twilio');
var clarifaiStore = require('../scripts/ClarifaiStore');

var AccountID = 'AC4b9a00ca5520e0debfb0cc74342dd3af';
var AuthToken = '65062a13fa75601bc46c067ec0dae491';

router.post('/', function(req, res, next) {
  var client = require('twilio')(AccountID, AuthToken);

  clarifaiStore.getIngredients({
    'body-json': {
      image: req.body['MediaUrl0'],
    },
  }, null, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data.recipes[0]);

      if (req.body['MediaUrl0']) {
        client.messages.create({
          to: req.body['From'],
          from: '+14807870438',
          body: data.recipes[0].title + '\n' + data.recipes[0]['source_url'] || 'Could not find a recipe',
        }, function(err, msg) {
          console.log(err);
        });
      } else {
        client.messages.create({
          to: req.body['From'],
          from: '+14807870438',
          body: 'send a pic pls'
        }, function(err, msg) {
          console.log(err);
        });
      }
    }
  })
});

module.exports = router;
