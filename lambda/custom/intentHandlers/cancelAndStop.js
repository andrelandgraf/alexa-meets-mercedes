const constants = require('../constants');
const auth = require('../services/auth');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type ===  constants.INTENT_REQUEST &&
            (handlerInput.requestEnvelope.request.intent.name ===  constants.CANCEL_INTENT ||
                handlerInput.requestEnvelope.request.intent.name === constants.STOP_INTENT);
    },
    handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.goodbye)
            .withSimpleCard(language.card.title, language.outputSpeech.goodbye)
            .getResponse();
    }
};

module.exports = {
    CancelAndStopIntentHandler,
};