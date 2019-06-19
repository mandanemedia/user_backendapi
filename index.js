const express = require('express');
const helmet = require('helmet')
var path = require('path');
const manageUsers = require ('./lib/manageUsers.js');
const accessLayer = require ('./lib/accessLayer.js');
const bodyParser = require('body-parser');
const config = require ('./config');

function user_backendapi(){
    let app = express();
    const port = process.env.PORT || 8000;
    let mainApp = new manageUsers.manageUsers();

    //Parse incoming request bodies in a middleware before your handlers
    app.use(bodyParser.urlencoded({extended: true})); //This parser accepts only UTF-8 encoding of the body a
    app.use(bodyParser.json());// parse application/json

    app.use(helmet());

    app.post('/signup', mainApp.signup)
    app.post('/login', mainApp.login);
    app.get('/users', accessLayer.verifyToken, mainApp.getUsers);
    app.put('/users', accessLayer.verifyToken, mainApp.updateUser);
    app.listen(port, async (req,res) => {
        console.log(`Started and listening on port ${port}!`);
    });
}
user_backendapi();
