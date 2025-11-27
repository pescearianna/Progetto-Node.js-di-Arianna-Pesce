const express = require('express');
const router = express.Router();

const usersController = require('../../controllers/views/usersViewController');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUser);

 router.post('/', usersController.createUser);

module.exports = router;