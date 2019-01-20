function tokenExists(handlerInput){
    return (handlerInput.requestEnvelope.context.System.user.accessToken !== undefined
            && handlerInput.requestEnvelope.context.System.user.accessToken !== null
            && handlerInput.requestEnvelope.context.System.user.accessToken !== '');
    
}

const isAuthenticated = function(handlerInput){
    return (process.env.USE_MOCKUP === '1' || process.env.UNIT_TEST || tokenExists(handlerInput));
}

const getToken = function(handlerInput) {
    return handlerInput.requestEnvelope.context.System.user.accessToken;
}

module.exports = {
    isAuthenticated,
}