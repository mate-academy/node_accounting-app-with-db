const router = require('express').Router();
const express = require('express');
const {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  updateUser,
} = require('../controllers/users-controllers');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', express.json(), postUser);

router.delete('/users/:id', deleteUser);

router.patch('/users/:id', express.json(), updateUser);

module.exports = router;
