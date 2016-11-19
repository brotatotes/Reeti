
function sendTwilioText(number, body) {
    var accountSid = 'AC4b9a00ca5520e0debfb0cc74342dd3af';
    var authToken = '65062a13fa75601bc46c067ec0dae491';

    //require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: number,
        from: '14807870438',
        body: body,
    }, function (err, message) {
        console.log(message.sid);
    });
}

sendTwilioText('4805705969', 'hi austin');