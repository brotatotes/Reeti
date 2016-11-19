var request = require('request');
var url = "https://api.clarifai.com/v1/tag"
var image = ""
var image_test = "https://samples.clarifai.com/metro-north.jpg"
//image will be the image we get from the user (twilio)
var access_token = "iK0QKs33uO9shdmEW4UH9iMV8BPSaF"

{Authorization: Bearer {iK0QKs33uO9shdmEW4UH9iMV8BPSaF}}

request.get({
	url: url + "?" + image_test + "&" + access_token
})