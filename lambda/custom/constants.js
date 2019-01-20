
const LAUNCH_REQUEST = 'LaunchRequest';
const INTENT_REQUEST = 'IntentRequest';
const CANCEL_INTENT = 'AMAZON.CancelIntent';
const STOP_INTENT = 'AMAZON.StopIntent';
const HELP_INTENT = 'AMAZON.HelpIntent';
const LOCK_INTENT = 'LockVehicleIntent';
const IS_LOCKED_INTENT = 'IsVehicleLockedIntent';
const IS_DOOR_OPEN_INTENT = 'IsVehicleDoorOpenIntent';
const WHICH_DOOR_OPEN_INTENT = 'WhichVehicleDoorOpenIntent';
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
    'locked': 'Your Mercedes is locked',
    'notlocked': 'Your Mercedes is not locked',
    'couldnotLock': 'There was a problem, try to lock your car later.',
    'authRequired': 'You must authenticate with your Mercedes Account to use this skill.',
    'open': 'There is at least one door open',
    'closed': 'All doors are closed',
    'whichDoor': 'is open',
}

module.exports = {
    LAUNCH_REQUEST,
    INTENT_REQUEST,
    CANCEL_INTENT,
    STOP_INTENT,
    HELP_INTENT,
    LOCK_INTENT,
    IS_LOCKED_INTENT,
    IS_DOOR_OPEN_INTENT,
    WHICH_DOOR_OPEN_INTENT,
    SESSION_ENDED_REQUEST,
    card,
    outputSpeech,
};