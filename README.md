# alexa-meets-mercedes

A AWS lambda function for Amazon Alexa to trigger the Mercedes connected vehicle API. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing the test packages

Clone the repository and run `npm run install` on the root folder. Those packages are required for testing. 

### Installing the packages for production

Navigate into `lambda>custom` and run `npm run install` again. Those packages are required within the AWS lambda function. 

### ZIP the production folder

Navigate into `lambda>custom` and run `npm run build`. This will create a zip file that you can upload on your AWS lambfa function. 

### Create a AWS Lambda function

You can find all needed information on [developer.amazon](https://developer.amazon.com/de/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html)

### Set up your Alexa skill 

Set up your Alexa skill on the [Amazon Dev Console](https://developer.amazon.com/alexa/console/ask). Use the `json-File` in the model folder to set up all Intents. Use the Test-Tab within the Amazon Dev Console for a try run. 

### Create a Mercedes Developer Account, create a new project and subscribe the API to get your client credentials

Go to the [Developer Page](https://developer.mercedes-benz.com/) and create a new account if you have none. Create a new APP and subscribe the app to the [Connected Vehicle Experimental API](https://developer.mercedes-benz.com/apis/connected_vehicle_experimental_api)

### Opt-in for the Car Simulator (Sandbox) to receive a virtual vehicle

See: https://car-simulator.developer.mercedes-benz.com

### Set up ENV for testing

Use the `EXAMPLE.env` as a template. Save your client credentials as `.env`.

### Set up Account Linking

Follow [these instructions](https://developer.amazon.com/de/docs/account-linking/account-linking-for-custom-skills.html) to set up Account Linking between the Mercedes API and Amazon Alexa.

## Testing

There are different ways to test your installation. 

### Alexa Unit tests

Run `npm run test` in the root folder of your project in order to run the bespoken unit tests.

### Mercedes API Integration tests

Add http://localhost:3000/ as the redirect url within your Mercedes App in the Mercedes Developer Console. 

Run `node index.js` in the root folder to start a express.js server for manually testing the Mercedes API Authentification and selected features of the API. 

Open http://localhost:3000/ and click on "Auth" to go through the authentification process. 

### Alexa Developer Console

Goto the Alexa Developer Console, Tab Test. 

### Enable the dev Skill within your Alexa (Web-)App to test on your own device

Goto the https://alexa.amazon.com/spa/index.html#skills/your-skills/ and select your skill, enable it and go through the Account Linking process.  
