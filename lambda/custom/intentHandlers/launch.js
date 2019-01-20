const constants = require('../constants');
const auth = require('../services/auth');

/*
 * the LaunchRequest event occurs when the skill is invoked without a specific intent.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.LAUNCH_REQUEST;
    },
    handle(handlerInput) {
        const language = auth.getLanguageStrings(handlerInput);
        if(! auth.isAuthenticated(handlerInput)){
            return handlerInput.responseBuilder
                .speak(language.outputSpeech.authRequired)
                .withLinkAccountCard()
                .getResponse();
        }
        return handlerInput.responseBuilder
            .speak(language.outputSpeech.ready)
            .reprompt(language.outputSpeech.ready)
            .withSimpleCard(language.card.title, language.outputSpeech.ready)
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler,
};