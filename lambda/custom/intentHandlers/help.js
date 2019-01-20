const constants = require('../constants');
const auth = require('../services/auth');

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.HELP_INTENT;
    },
    handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.help)
            .reprompt(language.outputSpeech.help)
            .withSimpleCard(language.card.title, language.outputSpeech.help)
            .getResponse();
    }
};

module.exports = {
    HelpIntentHandler,
};