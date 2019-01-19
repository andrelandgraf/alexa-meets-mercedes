
const LAUNCH_REQUEST = 'LaunchRequest';
const INTENT_REQUEST = 'IntentRequest';
const CANCEL_INTENT = 'AMAZON.CancelIntent';
const STOP_INTENT = 'AMAZON.StopIntent';
const HELP_INTENT = 'AMAZON.HelpIntent';
const LOCK_INTENT = 'LockVehicleIntent';
const SESSION_ENDED_REQUEST = 'SessionEndedRequest';

const card = {
    'title': 'Mercedes Connected Vehicle',
}

const outputSpeech = {
    'ready': 'Mercedes Connected Vehicle is ready',
    'goodbye': 'Goodbye!',
    'error': 'Sorry, I can\'t understand the command. Please say again.',
    'help': 'I am your virtual Mercedes Assistant. I can lock your car and more!',
    'lock': 'Your Mercedes is now locked.',
}

module.exports = {
    LAUNCH_REQUEST,
    INTENT_REQUEST,
    CANCEL_INTENT,
    STOP_INTENT,
    HELP_INTENT,
    LOCK_INTENT,
    SESSION_ENDED_REQUEST,
    card,
    outputSpeech,
};