'use strict';

const usersService = require('../services/users');

async function getUsers(req, res) {
  const users = await usersService.getAll();

  if (!users) {
    res.status(404).send({ message: 'Users not found' });

    return;
  }

  res.send(
    users.map(usersService.normalize),
  );
}

async function getUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    res.status(422).send({ message: 'Invalid user id' });

    return;
  }

  const foundUser = await usersService.getById(+userId);

  if (!foundUser) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  res.send(
    usersService.normalize(foundUser),
  );
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.status(422).send({ message: 'Name is required' });

    return;
  }

  const newUser = await usersService.create(name);

  if (!newUser) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.status(201).send(
    usersService.normalize(newUser),
  );
}

async function updateUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    res.status(422).send({ message: 'Invalid user id' });

    return;
  }

  const foundUser = await usersService.getById(+userId);

  if (!foundUser) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(422).send({ message: 'Name is required' });

    return;
  }

  if (typeof name !== 'string') {
    res.status(422).send({ message: 'Invalid name (must be a string)' });

    return;
  }

  const updatedUser = await usersService.update({
    id: +userId,
    name,
  });

  if (!updatedUser) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.send(
    usersService.normalize(updatedUser),
  );
}

async function deleteUser(req, res) {
  const { userId } = req.params;

  if (isNaN(userId)) {
    res.status(422).send({ message: 'Invalid user id' });

    return;
  }

  const foundUser = await usersService.getById(+userId);

  if (!foundUser) {
    res.status(404).send({ message: 'User not found' });

    return;
  }

  const deletedUser = await usersService.remove(+userId);

  if (!deletedUser) {
    res.status(500).send({ message: 'Database error' });

    return;
  }

  res.status(204).send();
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
