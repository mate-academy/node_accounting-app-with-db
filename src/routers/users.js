'use strict';

const express = require('express');
const usersController = require('../controllers/users');
const router = express.Router();

router.post('/', usersController.create);
router.get('/', usersController.getAll);
router.get('/:userId', usersController.getById);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = router;
