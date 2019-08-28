var routerIndex = require('express').Router();
var routerGroup = require('express').Router();
var orderController = require('../controllers/order');
var stateController = require('../controllers/state');

/*
 * api/order
 */
routerGroup.get('/', orderController.index);

routerGroup.get('/orders', orderController.view);

routerGroup.post('/orders', orderController.new);

routerGroup.get('/orders/:id', orderController.details);

routerGroup.put('/orders/:id', orderController.update);

routerGroup.delete('/orders/:id', orderController.delete);

/*
 * api/state
 */
routerGroup.get('/states', stateController.view);

routerGroup.post('/states', stateController.new);

routerGroup.get('/states/:id', stateController.details);

routerGroup.put('/states/:id', stateController.update);

routerGroup.delete('/states/:id', stateController.delete);

/*
 * Entry point
 */
routerIndex.use('/api', routerGroup);

module.exports = routerIndex;