'use strict'

const { Router } = require('express');
const usersControllers = require('../controllers/users');

const router = Router();

router.get('/', usersControllers.getAll);
router.get('/:userId', usersControllers.getById);

router.post('/', usersControllers.create);

router.delete('/:userId', usersControllers.remove);

router.patch('/:userId', usersControllers.update);

module.exports = { router };
