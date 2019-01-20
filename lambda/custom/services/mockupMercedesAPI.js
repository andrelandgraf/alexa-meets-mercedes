const constants = require('../constants');
let locked = false;

const isVehicleLocked = async function (authToken) {
    return locked;
}

const lockVehicle = async function (authToken) {
    locked = true;
    return locked;
}

const isDoorOpen = async function (authToken) {
    return false;
}

const whichDoorIsOpen = async function (authToken) {
    return constants.DOORS.NONE;
}

const getFuelLevel = async function (authToken) {
    return "40 Percent";
}

const getChargeState = async function (authToken) {
    return "40 Percent";
}

const endSession = function () {}

module.exports = {
    isVehicleLocked,
    lockVehicle,
    isDoorOpen,
    whichDoorIsOpen,
    getFuelLevel,
    getChargeState,
    endSession,
}