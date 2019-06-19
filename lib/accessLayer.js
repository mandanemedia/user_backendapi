const config = require ('./../config');
const jwt = require('jsonwebtoken');

// Make sure the token is valid
let verifyToken = (req, res, next) => {
  let token = req.headers['x-authentication-token'];
  if (token) {
      //All token should starts with 'Bearer '
      if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
      }
      //if the token is verified, send them to next steps otherwise return proper message!
      jwt.verify(token, config.secret, (err, decoded) => {
          if (err) {
              return res.json({
                  success: false,
                  message: 'Token is not valid'
              });
          } else {
              req.decoded = decoded;
              next();
          }
      });
  } else {
      return res.json({
          success: false
      });
  }
};

module.exports = {
  verifyToken: verifyToken
};
