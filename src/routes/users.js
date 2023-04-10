'use strict';

const usersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);

router.post('/', express.json(), usersController.add);

router.delete('/:userId', usersController.remove);

router.patch('/:userId', express.json(), usersController.update);

module.exports = {
  router,
};
