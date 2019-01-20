const constants = require('../constants');

/*
 * the LaunchRequest event occurs when the skill is invoked without a specific intent.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.LAUNCH_REQUEST;
    },
    handle(handlerInput) {
        if(! handlerInput.requestEnvelope.context.System.user.accessToken ){
            return handlerInput.responseBuilder
                .speak(constants.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(constants.outputSpeech.ready)
            .reprompt(constants.outputSpeech.ready)
            .withSimpleCard(constants.card.title, constants.outputSpeech.ready)
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler,
};