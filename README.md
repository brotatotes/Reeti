## [Try it!](https://reeti-recipe.herokuapp.com)

## IMPORTANT!!!
Twilio Texting MMS is costly so please don't spam :)

## Inspiration
Our dear friend Reeti often found herself left with a handful of random food ingredients she didn't know what to do with. She might go online, search different ingredients, surf the food network, or browse other food websites, hoping to find some recipe that she can use. What if you could just take a photo of what you've got, text it, and receive delicious recipes instantly?

## What it does
Twilio receives images of ingredients available for cooking. We apply filters to the Clarifai API food model to identify the ingredients given and reply with a recipe. Users can reply "more" if they don't like the recipe for a different one. It avoids searching online and only requires texting a picture, and uses computer vision in an interesting way.

## How we built it
The Express.js web application holds the entire project. Node.js performs various background requests and api calls, including Twilio API, Clarifai API, and Food2Fork API. Heroku hosts the project online with a bonus static webpage.  

## Challenges we ran into
We ran into some trouble when first using the Clarifai API food model. We tested photos of ingredients, but the computer vision system would return classifers that were not useful to us, like 'vegetable', or 'pasture'. Also, it seemed like often the system would incorrectly identify ingredients, like tomatoes as cherries, for example. We spent some time developing a decent algorithm to filter Clarifai's results and make recursive recipe search calls to significantly improve this.

## Accomplishments that we're proud of
We're really happy with how well it actually works! The entire texting interface works as expected and the recipes returned actually reasonably match the ingredients in the picture sent.

## What we learned
APIs streamline a lot of development and make lots of systems and services available, which lets us spend a lot more effort on the creativity and originality of our project. 

## What's next for Reeti-Recipe
Other than the picture they send, users can't currently make further specifications to narrow down what they are looking for in a recipe. We would like to integrate options for filters like 'vegetarian' or 'Mexican cuisine', which would represent the user's recipe preferences. 

If a best fitting recipe requires some ingredients not seen in the picture, our service could offer ways to order them or display nearby stores that have them with their prices. 

## Who, Where, When?
This project took place at Northwestern's WildHacks 2016 from November 18-20. Our team members are Austin Chambers, Adam He, Eric Hao, and Dylan Ong. We made it to the final top 10 hacks, and demoed to the entire hackathon!

