const Alexa = require('ask-sdk-core');

const error = require('./intentHandlers/error');
const launch = require('./intentHandlers/launch');
const cancelOrStop = require('./intentHandlers/cancelAndStop');
const lockVehicle = require('./intentHandlers/lockVehicle');
const sessionEnded = require('./intentHandlers/sessionEnded');
const help = require('./intentHandlers/help');


// https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        launch.LaunchRequestHandler,
        lockVehicle.LockVehicleIntentHandler,
        help.HelpIntentHandler,
        cancelOrStop.CancelAndStopIntentHandler,
        sessionEnded.SessionEndedRequestHandler)
    .addErrorHandlers(error.ErrorHandler)
    .lambda();