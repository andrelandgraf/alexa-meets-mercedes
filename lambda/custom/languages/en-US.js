const card = {
    'title': 'Mercedes Connected Vehicle',
}

const outputSpeech = {
    'ready': 'Mercedes Connected Vehicle is ready',
    'goodbye': 'Goodbye!',
    'error': 'Sorry, I can\'t understand the command. Please say again.',
    'help': 'I am your virtual Mercedes Assistant. I can lock your car and more!',
    'lock': 'Your Mercedes is now locked.',
    'locked': 'Your Mercedes is locked.',
    'notlocked': 'Your Mercedes is not locked.',
    'couldnotLock': 'There was a problem, try to lock your car later.',
    'authRequired': 'You must authenticate with your Mercedes Account to use this skill.',
    'open': 'There is at least one door open.',
    'closed': 'All doors are closed.',
    'whichDoor': 'is open.',
}

module.exports = {
    card,
    outputSpeech,
}