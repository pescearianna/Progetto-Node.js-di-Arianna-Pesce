const express = require('express');
const router = express.Router();

const ordersController = require('../../controllers/views/ordersViewController');

router.get('/', ordersController.getAllOrders);

// router.get('/:id', ordersController.getOrder);

// router.get('/:filter', ordersController.getAllOrders);

// router.put('/:id', ordersController.updateOrder);

router.post('/', ordersController.createOrder);

// router.delete('/:id', ordersController.deleteOrder);


module.exports = router;
