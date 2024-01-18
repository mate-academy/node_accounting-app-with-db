'use strict';

const express = require('express');

const userControler = require('../controllers/users.controller');

const router = express.Router();

router.get('/', userControler.getUsers);

router.get('/:id', userControler.getUser);

router.post('/', userControler.createUser);

router.delete('/:id', userControler.removeUser);

router.patch('/:id', userControler.updateUser);

module.exports = {
  router,
};
