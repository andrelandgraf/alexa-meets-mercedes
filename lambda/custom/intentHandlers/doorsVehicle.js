const constants = require('../constants');
const auth = require('../services/auth');
const mercedesAPI = auth.getMercedesAPI();

const IsVehicleDoorOpenIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.IS_DOOR_OPEN_INTENT;
    },
    async handle(handlerInput) {
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const open = await mercedesAPI.isDoorOpen(auth.getToken(handlerInput));
        if (open) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.open)
                .withSimpleCard(constants.card.title, constants.outputSpeech.open)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.closed)
            .withSimpleCard(constants.card.title, constants.outputSpeech.closed)
            .getResponse();
    }
};

const WhichVehicleDoorOpenIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.INTENT_REQUEST &&
            handlerInput.requestEnvelope.request.intent.name === constants.WHICH_DOOR_OPEN_INTENT;
    },
    async handle(handlerInput) {
        if (!auth.isAuthenticated(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        const which = await mercedesAPI.whichDoorIsOpen(auth.getToken(handlerInput));
        if (which == 'none') {
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.closed)
                .withSimpleCard(constants.card.title, constants.outputSpeech.closed)
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(which + ' ' + constants.outputSpeech.whichDoor)
            .withSimpleCard(constants.card.title, which +  ' ' + constants.outputSpeech.whichDoor)
            .getResponse();
    }
};

module.exports = {
    IsVehicleDoorOpenIntentHandler,
    WhichVehicleDoorOpenIntentHandler,
}