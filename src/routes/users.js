'use strict';

const express = require('express');

const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/', usersControllers.getAll);
router.get('/:userId', usersControllers.getById);
router.post('/', usersControllers.add);
router.delete('/:userId', usersControllers.remove);
router.patch('/:userId', usersControllers.update);

module.exports.router = router;
