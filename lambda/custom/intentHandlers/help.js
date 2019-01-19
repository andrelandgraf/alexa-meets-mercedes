const constants = require('../constants');

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.HELP_INTENT;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.help)
            .reprompt(constants.outputSpeech.help)
            .withSimpleCard(constants.card.title, constants.outputSpeech.help)
            .getResponse();
    }
};

module.exports = {
    HelpIntentHandler,
};