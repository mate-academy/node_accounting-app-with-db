'use strict';

const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
} = require('../controllers/users.controller');
// const User = require('../models/User.model');
const router = express.Router();

/* router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar usuários:', err);
    res.status(500).send('Erro no servidor');
  }
});

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Title não é válido');
  }

  try {
    const newUser = await User.create({
      title,
    });

    res.status(200).json(newUser);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Erro ao buscar usuários:', err);
    res.status(400).send('Erro no servidor');
  }
}); */

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/:id', patchUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
