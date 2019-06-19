const config = require('./../config');
const pgQuery = require('./pgQuery');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class manageUsers {
  async signup(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    // Make sure email, firstName, lastName, password are passed
    if (!email || !firstName || !lastName || !password) {
      res.statusCode = 400;
      res.json({
        success: false
      });
    }
    else {
      await bcrypt.hash(password, config.saltRounds, async function(err, hashPassword) {
        try {
          let result = await pgQuery.signup(email, hashPassword, firstName, lastName);
          let token = jwt.sign({
              email: email
            },
            config.secret, {
              expiresIn: '12h'
            } // it expires in 12 hours}
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            token: token
          });
        } catch (e) {
          if (e.code === '23505') {
            res.statusCode = 409;
            res.json({
              success: false,
              message: 'The email address already exists'
            });
          } else {
            res.statusCode = 500;
            res.json({
              success: false,
              message: e.message
            });
          }
        }
      });
    }
  }
  async login(req, res) {
    try {
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) {
        res.statusCode = 400;
        res.json({
          success: false
        });
      }
      else {
        let result = await pgQuery.getUser_byEmail(email);
        if (result.rows.length > 0 && email === result.rows[0].email) {
          bcrypt.compare(password, result.rows[0].password, function(err, same) {
            if (same) {
              let token = jwt.sign({
                  email: email
                },
                config.secret, {
                  expiresIn: '12h'
                }
              );
              res.statusCode = 200;
              res.json({
                success: true,
                token: token
              });
            } else {
              res.statusCode = 400;
              res.json({
                success: false
              });
            }
          });
        } else {
          res.statusCode = 400;
          res.json({
            success: false
          });
        }
      }
    } catch (e) {
      res.statusCode = 500;
      console.log(e.message);
      res.json({
        success: false
      });
    }

  }
  async getUsers(req, res) {
    try {
      let result = await pgQuery.getAllUsers();
      res.json({
        users: result.rows
      });
    } catch (e) {
      res.statusCode = 500;
      res.json({
        success: false
      });
    }
  }
  async updateUser(req, res) {
    try {
      let email = req.decoded.email;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      if (!email || !firstName || !lastName) {
        res.statusCode = 400;
        res.json({
          success: false
        });
      }
      else {
        let result = await pgQuery.updateUser_byEmail(firstName, lastName, email);
        //Email passed the token but it does not find in database
        if(result.rowCount === 0){
          res.statusCode = 400;
          res.json({
            success: false
          });
        }
        else{
          res.statusCode = 200;
          res.json({
            success: true
          });
        }
      }
    } catch (e) {
      res.statusCode = 500;
      console.log(e.message);
      res.json({
        success: false
      });
    }
  }
}

module.exports = {
  manageUsers: manageUsers
}
