const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const service = require('./lambda/custom/services/mercedesAPI');
let authToken = undefined;
let refreshToken = undefined;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let count = 0;

function getHeader() {
    const clientID = process.env.MERCEDES_CLIENT_ID;
    const clientSecret = process.env.MERCEDES_CLIENT_SECRET;
    if (!clientID || !clientSecret) {
        console.log("Please use .env to store your client credentials");
    }
    const credentials = Buffer.from(clientID + ':' + clientSecret).toString('base64');
    return {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': 'Basic ' + credentials,
    };
}

function refreshAuthToken() {
    const headers = getHeader();
    const params = '?grant_type=refresh_token&refresh_token=' + refreshToken;
    const data = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    };
    postAuth(params, data, headers);
}

async function getAuthToken(authCode) {
    count = count + 1;
    if (count > 1) {
        console.log('already received one response');
        return;
    }
    const headers = getHeader();
    const params = '?grant_type=authorization_code&code=' + authCode + '&redirect_uri=http://localhost:3000/';
    const data = {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': 'http://localhost:3000/'
    };
    postAuth(params, data, headers);
}

function postAuth(params, data, headers) {
    axios.post('https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/token' + params, data, {
            'headers': headers
        }).then(function (res) {
            //console.log(res.data);
            authToken = res.data.access_token;
            refreshToken = res.data.refresh_token;
            return authToken;
        })
        .then(function() {
            //return service.isLocked(authToken);
            return service.lockVehicle(authToken);
        })
        .then(function (res) {
            if (res === 401) {
                refreshAuthToken();
            }
            console.log('Test results...');
            console.log(res);
        })
        .catch(function (err) {
            console.log(err);
        });
}

app.get('/', function (req, res) {
    if (req.query.code) {
        const authCode = req.query.code;
        getAuthToken(authCode);
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});