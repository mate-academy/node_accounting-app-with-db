'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/', express.json(), userController.getAll);
router.post('/', express.json(), userController.add);
router.get('/:userId', express.json(), userController.getCurrentUser);
router.delete('/:userId', userController.remove);
router.patch('/:userId', express.json(), userController.update);

module.exports = {
  router,
};
