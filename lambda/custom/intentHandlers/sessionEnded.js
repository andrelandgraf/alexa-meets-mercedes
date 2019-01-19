const constants = require('../constants');

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.SESSION_ENDED_REQUEST;
    },
    handle(handlerInput) {
        // TODO any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

module.exports = {
    SessionEndedRequestHandler,
};