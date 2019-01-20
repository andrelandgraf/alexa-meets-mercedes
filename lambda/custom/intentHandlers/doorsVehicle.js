const constants = require('../constants');
const auth = require('../services/auth');
const mercedesAPI = auth.getMercedesAPI();

const IsVehicleDoorOpenIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.IS_DOOR_OPEN_INTENT;
    },
    async handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const open = await mercedesAPI.isDoorOpen(auth.getToken(handlerInput));
        if (open) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.open)
                .withSimpleCard(language.card.title, language.outputSpeech.open)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.closed)
            .withSimpleCard(language.card.title, language.outputSpeech.closed)
            .getResponse();
    }
};

const WhichVehicleDoorOpenIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.WHICH_DOOR_OPEN_INTENT;
    },
    async handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const which = await mercedesAPI.whichDoorIsOpen(auth.getToken(handlerInput));
        if (which == 'none') {
            // all doors are closed
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.closed)
                .withSimpleCard(language.card.title, language.outputSpeech.closed)
                .getResponse();
        }
        // at least one door is open
        return handlerInput.responseBuilder
            .speak(language.whichDoor(which) + ' ' + language.outputSpeech.whichDoor)
            .withSimpleCard(language.card.title, which + ' ' + language.outputSpeech.whichDoor)
            .getResponse();
    }
};

module.exports = {
    IsVehicleDoorOpenIntentHandler,
    WhichVehicleDoorOpenIntentHandler,
}