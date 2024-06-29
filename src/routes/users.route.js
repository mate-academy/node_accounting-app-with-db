const {
  requestValidatorUser,
  currentUserValidator,
} = require('../middlewars/requestValidator.middlewar');
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
