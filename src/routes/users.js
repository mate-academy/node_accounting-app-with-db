'use strict';

const express = require('express');
const router = express.Router();

let users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const findUser = users.find(user => user.id === +userId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  res.json(findUser);
});

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.json({ error: 'Name is required' });

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() * 100),
    name,
  };

  users.push(newUser);

  res.status(201);
  res.json(newUser);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== +userId);

  if (filteredUsers.length === users.length) {
    return res.sendStatus(404);
  }

  users = filteredUsers;
  res.sendStatus(204);
});

router.patch('/:userId', (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;
  const findUser = users.find(user => user.id === +userId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  Object.assign(findUser, { name });
  res.json(findUser);
});

module.exports = {
  router,
  users,
};
