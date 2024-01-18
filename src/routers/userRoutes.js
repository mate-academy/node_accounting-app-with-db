'use strict';

const {
  getUsers,
  getUser,
  postUser,
  removeUser,
  updateOne,
} = require('../controllers/usersControllers');

const express = require('express');
const router = express.Router();

router.get('/', getUsers);
router.post('/', postUser);
router.get('/:id', getUser);
router.delete('/:id', removeUser);
router.patch('/:id', updateOne);

module.exports = {
  router,
};
