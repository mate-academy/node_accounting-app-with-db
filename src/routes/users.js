'use strict';

const usersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', express.json(), usersController.add);
router.delete('/:id', usersController.remove);
router.patch('/:id', express.json(), usersController.update);

module.exports = router;
