const axios = require('axios');

const constants = require('../constants');

const api = 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/';
let vehicleID = undefined;
let vehicle = undefined;

function getHeader(authToken) {
    return {
        'accept': 'application/json',
        'authorization': 'Bearer ' + authToken
    };
}

function postHeader(authToken) {
    return {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + authToken
    };
}

const postRequest = function (endpoint, data, authToken) {
    axios.post(api + endpoint, data, {
        'headers': postHeader(authToken)
    }).then(function (res) {
        console.log(res.data);
        return res.data;
    }).catch(function (err) {
        console.log(err.data);
    });
}

const getRequest = function (endpoint, authToken) {
    return axios.get(api + endpoint, {
        'headers': getHeader(authToken)
    }).then(function (res) {
        console.log(res.data);
        return res.data;
    }).catch(function (err) {
        console.log(err.response.data);
        return err.response.data.code;
    });
}

const getCar = function (authToken) {
    const endpoint = 'vehicles/';
    return getRequest(endpoint, authToken).then(function (carList) {
        vehicleID = carList[0].id;
    }).then(function () {
        const endpoint = 'vehicles/' + vehicleID;
        return getRequest(endpoint, authToken).then(function (car) {
            vehicle = car;
        })
    })
}

const getDoors = async function (authToken) {
    if (vehicleID === undefined) {
        await getCar(authToken);
    }
    const endpoint = 'vehicles/' + vehicleID + '/doors';
    const doors = await getRequest(endpoint, authToken);
    return doors;
}

const isVehicleLocked = async function (authToken) {
    const LOCKED = 'LOCKED';
    const doors = await getDoors(authToken);
    return (doors.doorlockstatusvehicle.value === LOCKED)
}

const lockVehicle = async function (authToken) {
    if (vehicleID === undefined) {
        await getCar(authToken);
    }
    const endpoint = 'vehicles/' + vehicleID + '/doors';
    const data = {
        command: "LOCK"
    }
    await postRequest(endpoint, data, authToken);
    return await isVehicleLocked(authToken);
}

const isDoorOpen = async function (authToken) {
    const OPEN = 'OPEN';
    const doors = await getDoors(authToken);
    return (doors.doorstatusfrontleft.value === OPEN ||
            doors.doorstatusfrontright.value === OPEN ||
            doors.doorstatusrearleft.value === OPEN) ||
        doors.doorstatusrearright.value === OPEN
}

const whichDoorIsOpen = async function (authToken) {
    const OPEN = 'OPEN';
    const doors = await getDoors(authToken);
    if (doors.doorstatusfrontleft.value === OPEN) {
        return constants.DOORS.FRONT_LEFT;
    }
    if (doors.doorstatusfrontright.value === OPEN) {
        return constants.DOORS.FRONT_RIGHT;
    }
    if (doors.doorstatusrearleft.value === OPEN) {
        return constants.DOORS.REAR_LEFT;
    }
    if (doors.doorstatusrearright.value === OPEN) {
        return constants.DOORS.REAR_LEFT;
    }
    return constants.DOORS.NONE;
}

const getFuelLevel = async function (authToken) {
    if (vehicleID === undefined) {
        await getCar(authToken);
    }
    const endpoint = 'vehicles/' + vehicleID + '/fuel';
    const fuel = await getRequest(endpoint, authToken);
    return fuel.value + ' ' + fuel.unit;
}

const getChargeState = async function (authToken) {
    if (vehicleID === undefined) {
        await getCar(authToken);
    }
    const endpoint = 'vehicles/' + vehicleID + '/stateofcharge';
    const charge = await getRequest(endpoint, authToken);
    return charge.value + ' ' + charge.unit;
}

const endSession = function () {
    vehicle = undefined;
    vehicleID = undefined;
}

module.exports = {
    isVehicleLocked,
    lockVehicle,
    isDoorOpen,
    whichDoorIsOpen,
    getFuelLevel,
    getChargeState,
    endSession,
}