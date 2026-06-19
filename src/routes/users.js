const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController.js');

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

module.exports = router;
