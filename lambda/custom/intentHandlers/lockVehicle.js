const constants = require('../constants');

const LockVehicleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.LOCK_INTENT;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.lock)
            .withSimpleCard(constants.card.title, constants.outputSpeech.lock)
            .getResponse();
    }
};

module.exports = {
    LockVehicleIntentHandler,
};