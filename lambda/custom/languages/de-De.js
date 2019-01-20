const constants = require('../constants');

const card = {
    'title': 'Mercedes Virtuelles Fahrzeug',
}

const outputSpeech = {
    'ready': 'Dein Mercedes Virtuelles Fahrzeug ist bereit!',
    'goodbye': 'Auf Wiedersehen!',
    'error': 'Es tut mir Leid, das verstehe ich leider nicht.',
    'help': 'Ich bin dein virtueller Fahrzeug Assistent, frag mich, ob das Auto zugesperrt ist!',
    'lock': 'Dein Mercedes ist jetzt abgesperrt.',
    'locked': 'Dein Mercedes ist abgesperrt.',
    'notlocked': 'Dein Mercedes ist nicht abgesperrt.',
    'couldnotLock': 'Es ist leider ein Problem aufgetreten, bitte versuche es später nocheinmal!',
    'authRequired': 'Authentifizierung erforderlich, bitte verknüpfe deinen Mercedes Account über die Alexa App.',
    'open': 'Es ist mindestens eine Tür offen.',
    'closed': 'Alle Türen sind geschlossen.',
    'whichDoor': 'Tür ist offen.',
}

// use constants to retrieve right German word
const whichDoor = function(which){
    switch(which) {
        case constants.DOORS.FRONT_LEFT:
            return 'Vorne Links';
        case constants.DOORS.FRONT_RIGHT:
            return 'Vorne Rechts';
        case constants.DOORS.REAR_LEFT:
            return 'Hinten Links';
        case constants.DOORS.REAR_RIGHT:
            return 'Hinten Rechts';
        default:
            return 'Keine'
    }
}

module.exports = {
    card,
    outputSpeech,
    whichDoor,
}