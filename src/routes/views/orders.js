const express = require('express');
const router = express.Router();

const ordersController = require('../../controllers/views/ordersViewController');

router.get('/', ordersController.getAllOrders);

router.get('/:id', ordersController.getOrder);

router.post('/', ordersController.createOrder);

module.exports = router;
