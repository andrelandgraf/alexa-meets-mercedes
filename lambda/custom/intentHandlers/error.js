const constants = require('../constants');
const auth = require('../services/auth');

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const language = auth.getLanguageStrings(handlerInput);
        return handlerInput.responseBuilder
            .speak()
            .reprompt(language.outputSpeech.error)
            .getResponse();
    },
};

module.exports = {
    ErrorHandler,
};