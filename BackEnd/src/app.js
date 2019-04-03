
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();

const security = require('./routes/security');
const api = require('./routes/api');

// Use body parser to parse JSON body
app.use(bodyParser.json());

// cors 
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

//app.set('Secret', config.secret);

// Debug request morgan middleware
app.use(morgan('dev'));

app.use('/security', security);
app.use('/api', api);

// set port
app.listen(3000, function () {
  console.log('Node app is running on port 3000');
});

module.exports = app;