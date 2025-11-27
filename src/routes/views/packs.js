const express = require('express');
const router = express.Router();

const packsViewController = require('../../controllers/views/packsViewController');

router.get('/', packsViewController.getAllPacks)

router.get('/:id', packsViewController.getPack)

router.post('/', packsViewController.createPack)

module.exports = router;