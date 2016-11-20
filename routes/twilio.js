var express = require('express');
var router = express.Router();
var twillio = require('twilio');
var clarifaiStore = require('../scripts/ClarifaiStore');

var AccountID = 'AC4b9a00ca5520e0debfb0cc74342dd3af';
var AuthToken = '65062a13fa75601bc46c067ec0dae491';

var users = {};

router.post('/', function(req, res, next) {
  var client = require('twilio')(AccountID, AuthToken);
  var sender = req.body['From'];
  var image_url = req.body['MediaUrl0'];

  if (image_url) {
    clarifaiStore.getIngredients({
      'body-json': {
        image: image_url,
      },
    }, null, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data.recipes);

        if (!(sender in users)) {
          users[sender] = {
            recipes: data.recipes,
            index: 0,
          };
        }

        var recipes = data.recipes;

        client.messages.create({
          to: sender,
          from: '+14807870438',
          body: (recipes.length > 0) ? recipes[0].title + '\n' + recipes[0]['source_url'] : 'Could not find a recipe',
        }, function(err, msg) {
          console.log(users, users[sender]);
          users[sender]['index'] = users[sender]['index'] + 1;
          if (recipes.length > 0) {
            client.messages.create({
              to: sender,
              from: '+14807870438',
              body: 'Reply MORE for another recipe',
            }, function(err, msg) {
              console.log(err);
            });
          }
        });
      }
    })
  } else if (sender in users) {
    console.log(users[sender]['recipes'][users[sender]['index']].title);
    client.messages.create({
      to: sender,
      from: '+14807870438',
      body: (users[sender]['index'] < users[sender]['recipes'].length) ? "Here's another recipe\n" + users[sender]['recipes'][users[sender]['index']].title + '\n' + users[sender]['recipes'][users[sender]['index']]['source_url'] : 'No more recipes :(',
    }, function(err, msg) {
      console.log(err);
      users[sender]['index'] = users[sender]['index'] + 1;
      if (users[sender]['recipes'].length > 0) {
        client.messages.create({
          to: sender,
          from: '+14807870438',
          body: 'Reply MORE for another recipe',
        }, function(err, msg) {
          console.log(err);
        });
      }
    });
  } else {
    client.messages.create({
      to: sender,
      from: '+14807870438',
      body: 'Please send us a picture :)'
    }, function(err, msg) {
      console.log(err);
    });
  }
});

module.exports = router;
