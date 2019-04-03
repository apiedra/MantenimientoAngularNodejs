/*jslint node:true*/

const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('../dbconfig');
const jwt = require('jsonwebtoken');
const api = express.Router();
const securityConfig = require('../security/config');
const clientService = require('../service/client-service');
const orderService = require('../service/order-service');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'logs/logfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );


const connAttrs = {
  user: dbConfig.user,
  password: dbConfig.password,
  connectString: dbConfig.connectString
}

// Security middleware
api.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, securityConfig.secret, (err, decoded) => {
      if (err) {
        res.contentType('application/json').status(401);
        return res.send(JSON.stringify({ success: false, message: 'Failed to authenticate token.' }));
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      message: 'No token provided.'
    });

  }
});

/****************************************Cliente*****************************************************/

// Http Method: GET
// URI        : /cliente
// List all clients 
api.get('/client', async (req, res) => {
  try {
    log.info('GET Consultar todos los usuarios ');
    const clients = await clientService.list();
    res.contentType('application/json').status(200);
    res.send(JSON.stringify(clients));
    log.info(JSON.stringify(clients));
  } catch (err) {
    log.error(err);
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error getting the list of clients",
      detailed_message: err.message
    }));
  }
});

// Http Method: GET
// URI        : /cliente
// List one client
api.get('/client/:idNumber', async (req, res) => {
  try {
    const idNumber = req.params.idNumber;
    log.info('GET consultar usuario',req.params);
    const clients = await clientService.getClient(idNumber);
    res.contentType('application/json').status(200);
    res.send(JSON.stringify(clients));
    log.info(JSON.stringify(clients));
  } catch (err) {
    log.error(err);
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error getting the list of clients",
      detailed_message: err.message
    }));
  }
});
// Http Method: POST
// URI        : /cliente
// Create client
api.post('/client', async (req, res) => {
  try {
    const client = req.body;
    log.info('POST insertar usuario',req.body);
    await clientService.create(client);
    res.contentType('application/json').status(201);
    res.status(201).send(JSON.stringify({
      status: 201,
      message: "Exito"
    }));
  } catch (err) {
    log.error(err);
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating client",
      detailed_message: err.message
    }));
  }
});

// Http Method: POST
// URI        : /cliente
// Update client
api.put('/client/:idNumber', async (req, res) => {
  try {
    let client = req.body;
    const idNumber = req.params.idNumber;
    client = {
      ...client,
      idNumber: idNumber
    }
    log.info('PUT Modificar Usuario',req.body);
    await clientService.update(client);
    res.contentType('application/json').status(200);
    res.send(JSON.stringify(client));
  } catch (err) {
    log.error(err);
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error updating client",
      detailed_message: err.message
    }));
  }
});

// Http Method: POST
// URI        : /cliente
// Delete client
api.delete('/client/:idNumber', async (req, res) => {
  try {
    const idNumber = req.params.idNumber;
    log.info('DELETE Eliminar Usuario',req.params);
    await clientService.delete(idNumber);
    res.contentType('application/json').status(200);
    res.status(201).send(JSON.stringify({
      status: 201,
      message: "Exito"
    }));
  } catch (err) {
    log.error(err);
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error deleting client",
      detailed_message: err.message
    }));
  }
});




/****************************************Pedidos*****************************************************/
// Http Method: GET
// URI        : /cliente
// List all clients 
api.get('/orders', async (req, res) => {
  try {
    const clients = await orderService.list();
    res.contentType('application/json').status(200);
    res.send(JSON.stringify(clients));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error getting the list of clients",
      detailed_message: err.message
    }));
  }
});


// Http Method: POST
// URI        : /order
// Create Order
api.post('/order', async (req, res) => {
  try {
    const order = req.body;
    await orderService.create(order);
    res.contentType('application/json').status(201);
    res.status(201).send(JSON.stringify({
      status: 201,
      message: "Exito"
    }));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating order",
      detailed_message: err.message
    }));
  }
});

// Http Method: POST
// URI        : /order
// Update Order
api.put('/order', async (req, res) => {
  try {
    const order = req.body;
    await orderService.update(order);
    res.contentType('application/json').status(201);
    res.send(JSON.stringify(order));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating order",
      detailed_message: err.message
    }));
  }
});

// Http Method: Delete
// URI        : /order
// Delete Order
api.delete('/order/:idOrder', async (req, res) => {
  try {
    const idOrder = req.params.idOrder;
    await orderService.delete(idOrder);
    res.contentType('application/json').status(201);
    res.send(JSON.stringify(idOrder));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating order",
      detailed_message: err.message
    }));
  }
});
// Http Method: Delete
// URI        : /order
// Delete Order
api.get('/orderDetail/:idOrder', async (req, res) => {
  try {
    const idOrder = req.params.idOrder;
    const orderDatail =await orderService.orderDetail(idOrder);
    res.contentType('application/json').status(201);
    res.send(JSON.stringify(orderDatail));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating order",
      detailed_message: err.message
    }));
  }
});
// Http Method: Delete
// URI        : /order
// Delete Order
api.get('/order/:idOrder', async (req, res) => {
  try {
    const idOrder = req.params.idOrder;
    const orderDatail =await orderService.getOrder(idOrder);
    res.contentType('application/json').status(201);
    res.send(JSON.stringify(orderDatail));
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).send(JSON.stringify({
      status: 500,
      message: "Error creating order",
      detailed_message: err.message
    }));
  }
});


module.exports = api;
