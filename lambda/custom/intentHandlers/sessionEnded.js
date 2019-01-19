const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // TODO any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

module.exports = {
    SessionEndedRequestHandler,
}