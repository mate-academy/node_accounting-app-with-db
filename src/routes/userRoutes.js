'use strict';

const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers); // GET /api/users
router.get('/:id', getUserById); // GET /api/users/:id
router.post('/', createUser); // POST /api/users
router.put('/:id', updateUser); // PUT /api/users/:id
router.patch('/:id', updateUser); // PATCH /api/users/:id
router.delete('/:id', deleteUser); // DELETE /api/users/:id

module.exports = router;
