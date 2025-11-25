const express = require('express');
const router = express.Router();
const ordersApiController = require('../../controllers/api/ordersApiController');

router.get('/', ordersApiController.getAllOrders);

router.get('/:id', ordersApiController.getOrder);

router.put('/:id', ordersApiController.updateOrder);

router.post('/', ordersApiController.createOrder);

router.delete('/:id', ordersApiController.deleteOrder);

module.exports = router;
