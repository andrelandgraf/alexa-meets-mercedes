# alexa-meets-mercedes

A AWS lambda function for Amazon Alexa to trigger the Mercedes connected vehicle API. 

## For Beta Testers

~~Because of [Issue #1](https://github.com/andrelandgraf/alexa-meets-mercedes/issues/1), it is not yet possible to link your Mercedes Account to this skill. Nevertheless, the AWS Lambda function that processes all requests is currently working in MOCKUP Mode. Also, it is currently possible to enable this skill without account linking. Therefore, you can activate the skill in your Alexa (Web-)App without linking. This will allow you to test out all the intents and receive mockup responses.~~

The AWS lambda function is now running in "production" mode as Issue #1 is solved. Link your Mercedes Account through the Alexa (Web-)App and get started. Also make sure you have a [virtual car](https://car-simulator.developer.mercedes-benz.com/orgs/lqPw/emulators) to check out the results. 

### Language Support

This skill currently supports US-English and German. All currently implemented intents work for both languages. Enjoy the language of your choice!

### What can I say?

Currently, this skill support four custom Intents and five Built-In Intents. 

Intents:
* LockVehicle - try: "Alexa, ask Mercedes to lock my car!" or "Alexa, sag Mercedes schließ meinen Mercedes ab."
* IsVehicleLocked - try: "Alexa, ask Mercedes is my vehicle locked?" or "Alexa, frag Mercedes ob mein Auto absperrt ist."
* IsVehicleDoorOpen - try: "Alexa, ask Mercedes if a door is open?" or "Alexa, frag Mercedes ob Türen offen sind".
* WhichDoorOpen - try: "Alexa, ask Mercedes which door is open?" or "Alexa, frage Mercedes welche Tür offen ist".

All possible requests and commands can be found in the `model` subfolder.

# Set up your own environment

Use this repository as a starting point to build your own Alexa Skill!

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing the test packages

Clone the repository and run `npm run install` on the root folder. Those packages are required for testing. 

### Installing the packages for production

Navigate into `lambda>custom` and run `npm run install` again. Those packages are required within the AWS lambda function. 

# Deployment

Follow these instructions to start building your own AWS based Alexa Skill, see blelow for notes on how to test the project both locally and on a live system.

## Set up your Alexa skill 

Set up your Alexa skill on the [Amazon Dev Console](https://developer.amazon.com/alexa/console/ask). Use the `json-File` in the model folder to set up all Intents. Use the Test-Tab within the Amazon Dev Console for a try run. 

Do this for every language you want to support. 

## ZIP the production folder

Navigate into `lambda>custom` and run `npm run build`. This will create a zip file that you can upload on your AWS lambfa function. 

## Create a AWS Lambda function

You can find all needed information on [developer.amazon](https://developer.amazon.com/de/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html)

### Create a env variable

Create a env variable in your AWS console named `USE_MOCKUP` and set it to `0`.

```
USE_MOCKUP=1
```

### Upload your ZIP file

Upload your ZIP file and save your code. Your Application is now saved. 

### Create a small test case to ensure your deployment

Go to your Alexa Development Console, Tab Test and run a small test intent, e.g. "ask Mercedes to lock my car".

Copy the request-JSON File from the Console and go back to your lambda function. Create a new test case and paste the JSON. Running this test case will ensure that you have uploaded the code correctly.  

## Create a Mercedes Developer Account, create a new project and subscribe the API to get your client credentials

Go to the [Developer Page](https://developer.mercedes-benz.com/) and create a new account if you have none. Create a new App and subscribe the app to the [Connected Vehicle Experimental API](https://developer.mercedes-benz.com/apis/connected_vehicle_experimental_api)

### Opt-in for the Car Simulator (Sandbox) to receive a virtual vehicle

See: https://car-simulator.developer.mercedes-benz.com

### Set up Account Linking

Follow [these instructions](https://developer.amazon.com/de/docs/account-linking/account-linking-for-custom-skills.html) to set up Account Linking between the Mercedes API and Amazon Alexa.

# Testing

There are different ways to test your installation. 

## Alexa Unit tests (locale)

Run `npm run test` in the root folder of your project in order to run the bespoken unit tests. 
It exists one test file for every language in `test>unit`.

## Mercedes API Integration tests (locale + Mercedes API)

Use the `EXAMPLE.env` as a template. Save your Mercedes App client credentials in `.env`.

Add http://localhost:3000/ as the redirect url within your Mercedes App in the Mercedes Developer Console. 

Run `node index.js` in the root folder to start a express.js server for manually testing the Mercedes API Authentification and selected features of the API. 

Go to your [sandbox car](https://car-simulator.developer.mercedes-benz.com) and unlock any doors. 

Open http://localhost:3000/ and click on "Auth" to go through the authentification process.

Check your simulator car again, the doors should now be locked again. 


## Alexa Developer Console (Alexa Build + AWS lambda function)

Goto the Alexa Developer Console, Tab Test. 

It is currently not possible to test Authentification (Account Linking) on the Developer Console. 
Therefore, make sure to set `USE_MOCKUP`to `1` for the AWS lambda env. 

```
USE_MOCKUP=1
```

## Enable the dev Skill within your Alexa (Web-)App to test on your own device (Alexa Build + AWS lambda function)

Goto the https://alexa.amazon.com/spa/index.html#skills/your-skills/ and select your skill, enable it and go through the Account Linking process.  
