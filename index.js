const express = require('express');
var path = require('path');
const log = require('./lib/logger');
const manageUsers = require ('./lib/manageUsers.js');
const config = require ('./config');

const app = express();
const port = 1367;
process.env.TZ = 'UTC';

app.get('/', async (req, res) =>  {
    log(`Test index`);
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.write('index');
    res.end();
});

app.get('/update/:tf', async (req, res) => {
    res.send(await manageUsers.display('Test'));
});

app.listen(port, async (req,res) => {
    log(`Started and listening on port ${port}!`);
});
