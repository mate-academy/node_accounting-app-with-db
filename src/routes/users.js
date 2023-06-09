'use strict';

const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', usersController.add);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = router;
