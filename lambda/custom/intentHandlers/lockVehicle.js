const constants = require('../constants');
const auth = require('../services/auth');
const mercedesAPI = auth.getMercedesAPI();

const LockVehicleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.LOCK_INTENT;
    },
    async handle(handlerInput) {
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const locked = await mercedesAPI.lockVehicle(auth.getToken(handlerInput));
        if (locked) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.lock)
                .withSimpleCard(constants.card.title, constants.outputSpeech.lock)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.couldnotLock)
            .withSimpleCard(constants.card.title, constants.outputSpeech.couldnotLock)
            .getResponse();
    }
};

const IsVehicleLockedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.LOCK_INTENT;
    },
    async handle(handlerInput) {
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const locked = await mercedesAPI.lockVehicle(auth.getToken(handlerInput));
        if (locked) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.lock)
                .withSimpleCard(constants.card.title, constants.outputSpeech.lock)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.couldnotLock)
            .withSimpleCard(constants.card.title, constants.outputSpeech.couldnotLock)
            .getResponse();
    }
};

module.exports = {
    LockVehicleIntentHandler,
};