'use strict';

const express = require('express');
const usersServices = require('../controllers/users');
const router = express.Router();

router.get('/', usersServices.getAll);
router.get('/:userId', usersServices.getOne);
router.post('/', usersServices.create);
router.delete('/:userId', usersServices.remove);
router.patch('/:userId', usersServices.update);

module.exports = { router };
