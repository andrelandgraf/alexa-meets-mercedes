
function tokenExists(handlerInput) {
    return (handlerInput.requestEnvelope.context.System.user.accessToken !== undefined &&
        handlerInput.requestEnvelope.context.System.user.accessToken !== null &&
        handlerInput.requestEnvelope.context.System.user.accessToken !== '');

}

// User is Authenticated with linked Mercedes Account if the request containts a access_token
const isAuthenticated = function (handlerInput) {
    // UNIT_TEST is set by bespoken to run unit tests and avoid auth
    // USE_MOCKUP can be set on the server as a env variable to avoid auth and test mockup responses
    return (process.env.USE_MOCKUP === '1' || process.env.UNIT_TEST || tokenExists(handlerInput));
}

const getToken = function (handlerInput) {
    return handlerInput.requestEnvelope.context.System.user.accessToken;
}

// Return the right file for string constants depending on the request language
const getLanguageStrings = function (handlerInput) {
    if (handlerInput.requestEnvelope.request.locale === 'en-US' ||
        handlerInput.requestEnvelope.request.locale === 'en-GB') {
        return require('../languages/en-US');
    }
    if (handlerInput.requestEnvelope.request.locale === 'de-DE') {
        return require('../languages/de-De');
    }
    return require('../languages/de-De');
}

// Use Mockup API for test env, else production API
const getMercedesAPI = function () {
    if (process.env.USE_MOCKUP === '1' || process.env.UNIT_TEST) {
        return require('./mockupMercedesAPI');
    }
    return require('./mercedesAPI');
}

module.exports = {
    isAuthenticated,
    getToken,
    getMercedesAPI,
    getLanguageStrings,
}