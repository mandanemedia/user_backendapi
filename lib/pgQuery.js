const pg = require('pg');
const config = require ('./../config');
const pool = new pg.Pool(config.DBPoolConnection);

/*
INSERT INTO "public"."users"
VALUES ('test', 'sasd', '12asd', 'ascca')
on conflict return -1
*/

var signup = async function (email, hashPassword, firstName, lastName) {
    let client = await pool.connect();
    email = email.toLowerCase();

    var query = 'insert into users ';
    query += ' ("email", "password", "firstName", "lastName") ';
    query += ' values ( $1, $2, $3, $4 )';
    // query += ' ON CONFLICT DO NOTHING';
    let result = await client.query(query, [email, hashPassword, firstName, lastName]);
    await client.release();
}

var getUser_byEmail = async function (email){
    let client = await pool.connect();
    let query = 'SELECT email, password FROM users ';
    query += ' WHERE email= $1 ;'
    let result = await client.query( query, [email]);
    await client.release();
    return result;
}

var updateUser_byEmail = async function (firstName, lastName, email){
    let client = await pool.connect();
    let query = 'UPDATE users ';
    query += ' SET "firstName" = $1, "lastName" = $2 '
    query += ' WHERE email= $3 ;'
    let result = await client.query( query, [firstName, lastName, email]);
    await client.release();
    return result;
}

var getAllUsers = async function (){
    let client = await pool.connect();
    let query = 'SELECT email, "firstName", "lastName" FROM users;';
    let result = await client.query( query);
    await client.release();
    return result;
}

module.exports = {
    getAllUsers: getAllUsers,
    getUser_byEmail: getUser_byEmail,
    updateUser_byEmail: updateUser_byEmail,
    signup: signup
}
