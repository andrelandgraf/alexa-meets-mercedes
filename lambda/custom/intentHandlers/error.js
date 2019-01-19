const constants = require('../constants');

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak()
            .reprompt(constants.outputSpeech.error)
            .getResponse();
    },
};

module.exports = {
    ErrorHandler,
};