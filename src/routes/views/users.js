const express = require('express');
const router = express.Router();


const usersController = require('../../controllers/views/usersViewController');

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getUser);

// router.put('/:id', usersController.updateUser);

 router.post('/', usersController.createUser);

// router.delete('/:id', usersController.deleteUser);


module.exports = router;