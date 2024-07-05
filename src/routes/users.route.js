const {
  requestValidatorUser,
  currentUserValidator,
} = require('../middleware/validator.middleware');
const {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
} = require('./../controllers/users.controller');

const express = require('express');

const router = express.Router();

router.get('/users', getUsers);

router.post('/users', requestValidatorUser, createUser);

router.get('/users/:id', currentUserValidator, getCurrentUser);

router.delete('/users/:id', currentUserValidator, removeCurrentUser);

router.patch('/users/:id', currentUserValidator, updateCurrentUser);

module.exports = {
  router,
};
