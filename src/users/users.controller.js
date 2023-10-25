/* eslint-disable no-console */
'use strict';

const { usersService } = require('./users.service');

const getAllUsers = async(req, res) => {
  try {
    const users = await usersService.getUsers();

    res.status(200).send(users);
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
    res.sendStatus(500);
  }
};

const getUserbyId = async(req, res) => {
  const { id } = req.params;
  const userToSend = await usersService.getUser(id);

  if (!userToSend) {
    res.sendStatus(404);
  } else {
    res.status(200).send(userToSend);
  }
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(422);
    res.send('Required field missing');

    return;
  }

  const user = await usersService.addNewUser({
    name,
  });

  if (!user) {
    res.sendStatus(500);
  }

  res.status(201);
  res.send(user);
};

const deleteUser = async(req, res) => {
  const { id } = req.params;
  const userToDelete = await usersService.getUser(id);

  if (userToDelete) {
    await usersService.deleteOneUser(id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userToUpdate = await usersService.getUser(id);

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!userToUpdate) {
    res.sendStatus(404);
  } else {
    try {
      await usersService.updateUserName(id, name);
      res.status(200).send(usersService.getUser(id));
    } catch (error) {
      console.error('Błąd podczas aktualizacji użytkownika:', error);
      res.sendStatus(500);
    }
  }
};

const usersController = {
  getAllUsers,
  getUserbyId,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = {
  usersController,
};
