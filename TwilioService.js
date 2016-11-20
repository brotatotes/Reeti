//
// function sendTwilioText(number, body) {
//     var accountSid = 'AC4b9a00ca5520e0debfb0cc74342dd3af';
//     var authToken = '65062a13fa75601bc46c067ec0dae491';
//
//     //require the Twilio module and create a REST client
//     var client = require('twilio')(accountSid, authToken);
//
//     client.messages.create({
//         to: number,
//         from: '14807870438',
//         body: body,
//     }, function (err, message) {
//         console.log(message.sid);
//     });
// }
//
// sendTwilioText('4805705969', 'hi austin');


function sendTwilioText(event, context, callback) {
  var twillio = require('twilio');

  var AccountID = 'AC4b9a00ca5520e0debfb0cc74342dd3af';
  var AuthToken = '65062a13fa75601bc46c067ec0dae491';
  console.log(event['body-json']['From'], event['body-json']['MediaUrl0']);
  var client = require('twilio')(AccountID, AuthToken);
  if (event['body-json']['MediaUrl0']) {
    client.messages.create({
      to: event['body-json']['From'],
      from: '+14807870438',
      body: 'Got a Picture'
    }, function(err, msg) {
      console.log(err);
    });
  } else {
    client.messages.create({
      to: event['body-json']['From'],
      from: '+14807870438',
      body: 'Got Text'
    }, function(err, msg) {
      console.log(err);
    });
  }
}

module.exports = {
  sendTwilioText: sendTwilioText
}