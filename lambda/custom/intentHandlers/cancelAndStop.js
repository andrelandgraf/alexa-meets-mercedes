const constants = require('../constants');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type ===  constants.INTENT_REQUEST &&
            (handlerInput.requestEnvelope.request.intent.name ===  constants.CANCEL_INTENT ||
                handlerInput.requestEnvelope.request.intent.name === constants.STOP_INTENT);
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.goodbye)
            .withSimpleCard(constants.card.title, constants.outputSpeech.goodbye)
            .getResponse();
    }
};

module.exports = {
    CancelAndStopIntentHandler,
};