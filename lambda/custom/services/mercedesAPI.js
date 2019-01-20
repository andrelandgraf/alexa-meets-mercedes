const axios = require('axios');

const api = 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/';
let vehicleID = undefined;

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

const postRequest = function (endpoint, params, data, authToken) {
    axios.post(api + endpoint + params, data, {
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

const getCar = function(authToken) {
    const endpoint = 'vehicles/';
    return getRequest(endpoint, authToken).then(function(carList) {
        vehicleID = carList[0].id;
    });
}

const getDoors = async function(authToken) {
    if(vehicleID === undefined){
        await getCar(authToken);
    }
    const endpoint = 'vehicles/' + vehicleID + '/doors';
    const doors = await getRequest(endpoint, authToken);
    return doors;
}

const isVehicleLocked = async function(authToken) {
    const LOCKED = 'LOCKED';
    const doors = await getDoors(authToken);
    return (doors.doorlockstatusvehicle.value === LOCKED)
}

const isDoorOpen = async function(authToken) {
    const OPEN = 'OPEN';
    const doors = await getDoors(authToken);
    return (doors.doorstatusfrontleft.value === OPEN
            || doors.doorstatusfrontright.value === OPEN
            || doors.doorstatusrearleft.value === OPEN)
            || doors.doorstatusrearright.value === OPEN
}

const whichDoorIsOpen = async function(authToken) {
    const OPEN = 'OPEN';
    const doors = await getDoors(authToken);
    if (doors.doorstatusfrontleft.value === OPEN) {
        return 'front left';
    }
    if(doors.doorstatusfrontright.value === OPEN) {
        return 'front right';
    }
    if(doors.doorstatusrearleft.value === OPEN) {
        return 'rear left';
    }
    if(doors.doorstatusrearright.value === OPEN) {
        return 'rear right';
    }
    return 'none';
}

module.exports = {
    isVehicleLocked,
    isDoorOpen,
    whichDoorIsOpen,
}