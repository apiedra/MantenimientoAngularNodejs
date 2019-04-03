/*jslint node:true*/

const express = require('express');
const jwt = require('jsonwebtoken');
const security = express.Router();
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'logs/logfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );

const securityConfig = require('../security/config');

security.post('/authenticate', (req, res) => {

  log.info('Autenticación ',req.body.username,req.body.password);
  if (req.body.username === "pfcti") {
    if (req.body.password === 123) {
      //if eveything is okey let's create our token 
      const payload = {
        check: true
      };

      var token = jwt.sign(payload, securityConfig.secret, {
        expiresIn: 1440 // expires in 24 hours
      });

      res.json({
        message: 'authentication done ',
        token: token
      });

    } else {
      res.json({ message: "please check your password !" })
    }
  } else {
    res.json({ message: "user not found !" })
  }
})

module.exports = security;
