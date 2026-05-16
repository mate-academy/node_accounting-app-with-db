const express = require('express');
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getOneUser);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', removeUser);

module.exports = { router };
