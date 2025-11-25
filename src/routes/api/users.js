const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/api/usersApiController');

router.get('/', usersApiController.getAllUsers);

router.get('/:id', usersApiController.getUser);

router.put('/:id', usersApiController.updateUser);

router.post('/', usersApiController.createUser);

router.delete('/:id', usersApiController.deleteUser);

module.exports = router;