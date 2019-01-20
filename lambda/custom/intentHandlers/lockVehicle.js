const constants = require('../constants');
const auth = require('../services/auth');
const mercedesAPI = auth.getMercedesAPI();

const LockVehicleIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.LOCK_INTENT;
    },
    async handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const locked = await mercedesAPI.lockVehicle(auth.getToken(handlerInput));
        if (locked) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.lock)
                .withSimpleCard(language.card.title, language.outputSpeech.lock)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.couldnotLock)
            .withSimpleCard(language.card.title, language.outputSpeech.couldnotLock)
            .getResponse();
    }
};

const IsVehicleLockedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.IS_LOCKED_INTENT;
    },
    async handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const locked = await mercedesAPI.isVehicleLocked(auth.getToken(handlerInput));
        if (locked) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.locked)
                .withSimpleCard(language.card.title, language.outputSpeech.locked)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.notlocked)
            .withSimpleCard(language.card.title, language.outputSpeech.notlocked)
            .getResponse();
    }
};

module.exports = {
    LockVehicleIntentHandler,
    IsVehicleLockedIntentHandler
};