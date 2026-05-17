const express = require('express');
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUsersById);
router.patch('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = { router };
