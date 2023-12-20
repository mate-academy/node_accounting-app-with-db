'use strict';

const usersService = require('../services/users.service');

const get = async(req, res) => {
  const users = await usersService.getAllUsers();

  if (!users) {
    res.sendStatus(404);

    return;
  }
  res.send(users.map(user => usersService.normalize(user)));
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(usersService.normalize(user));
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(user).then(() => {
    console.log('User was deleted successfully');
  })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
  res.sendStatus(204);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  usersService.addUser(name).then(() => {
    console.log('User was added successfully');
  })
    .catch((error) => {
      console.error('Error occurred:', error);
    });

  res.statusCode = 201;
  res.send(204);
};

const update = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.getUserById(id);

  if (!user) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await usersService.updateUser(user);

  res.statusCode = 201;
  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
