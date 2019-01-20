const constants = require('../constants');
const auth = require('../services/auth');
const mercedesAPI = auth.getMercedesAPI();

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === constants.SESSION_ENDED_REQUEST;
    },
    handle(handlerInput) {
        //  any cleanup logic goes here
        mercedesAPI.endSession();
        return handlerInput.responseBuilder.getResponse();
    }
};

module.exports = {
    SessionEndedRequestHandler,
};