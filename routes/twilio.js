var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var clarifaiStore = require('../scripts/ClarifaiStore');

var AccountID = 'AC720f29ac5532f737761085e3c755513f';
var AuthToken = '773be995cac24f7e0c3449b17257725d';

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
          from: '+13123132436',
          body: (recipes.length > 0) ? recipes[0].title + '\n' + recipes[0]['source_url'] : 'Could not find a recipe',
        }, function(err, msg) {
          console.log(users, users[sender]);
          users[sender]['index'] = users[sender]['index'] + 1;
          if (recipes.length > 0) {
            client.messages.create({
              to: sender,
              from: '+13123132436',
              body: 'Reply MORE for another recipe',
            }, function(err, msg) {
              console.log(err);
            });
          }
        });
      }
    })
  } else if (sender in users) {
    console.log(users[sender]['recipes']);
    client.messages.create({
      to: sender,
      from: '+13123132436',
      body: (users[sender]['index'] < users[sender]['recipes'].length) ? "Here's another recipe\n" + users[sender]['recipes'][users[sender]['index']].title + '\n' + users[sender]['recipes'][users[sender]['index']]['source_url'] : 'No more recipes :(',
    }, function(err, msg) {
      console.log(err);
      users[sender]['index'] = users[sender]['index'] + 1;
      if (users[sender]['recipes'].length > 0) {
        client.messages.create({
          to: sender,
          from: '+13123132436',
          body: 'Reply MORE for another recipe',
        }, function(err, msg) {
          console.log(err);
        });
      }
    });
  } else {
    client.messages.create({
      to: sender,
      from: '+13123132436',
      body: 'Please send us a picture :)'
    }, function(err, msg) {
      console.log(err);
    });
  }
});

module.exports = router;
