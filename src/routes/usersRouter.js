const express = require('express');
const userController = require('../controllers/usersController');
const { errorHandler } = require('../middleware/errorHandler');

const router = express.Router();

router
  .route('/')
  .get(errorHandler(userController.getAll))
  .post(errorHandler(userController.create));

router
  .route('/:id')
  .get(errorHandler(userController.getOne))
  .delete(errorHandler(userController.remove))
  .patch(errorHandler(userController.update));

module.exports = { router };
