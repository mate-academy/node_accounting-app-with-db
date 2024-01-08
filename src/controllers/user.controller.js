'use strict';

const { userService } = require('../services/user.service.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users.map(user => userService.normalize(user)));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Request does not have "name" property.');
  }

  const user = await userService.create(name);

  res.statusCode = 201;

  res.send(userService.normalize(user));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const user = await userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(userService.normalize(user));
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const user = await userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  await userService.remove(+id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  if (!name) {
    return res.status(400).send('Request does not have "name" property.');
  }

  const user = await userService.getById(+id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const updatedUser = await userService.update({
    id: +id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  userController: {
    getAll,
    create,
    getOne,
    remove,
    update,
  },
};
