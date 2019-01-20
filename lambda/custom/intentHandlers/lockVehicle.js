const constants = require('../constants');
const auth = require('../services/auth');

const LockVehicleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.LOCK_INTENT;
    },
    handle(handlerInput) {
        if(! auth.isAuthenticated(handlerInput)){
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.lock)
            .withSimpleCard(constants.card.title, constants.outputSpeech.lock)
            .getResponse();
    }
};

module.exports = {
    LockVehicleIntentHandler,
};