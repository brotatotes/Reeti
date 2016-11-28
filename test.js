var request = require('request');

request.post({
    url: 'https://api.clarifai.com/v1/token/',
    form: {
        client_id: process.env.CLARIFAI_CLIENT_ID,
        client_secret: process.env.CLARIFAI_CLIENT_SECRET,
        grant_type: 'client_credentials',
    },
}, function(err, response, body) {
    body = JSON.parse(body);
    console.log(body, body['access_token']);
})
