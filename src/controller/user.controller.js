'use strict';

const User = require('../models/User.model.js');
const userService = require('../services/user.service.js');

const getAll = async (req, res) => {
  const result = await userService.getAll();

  res.json(result);
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getOne(id);

  if (!user) {
    res.sendStatus(404).end();

    return;
  }

  res.send(user).end();
};

const addUser = async (req, res) => {
  if (
    Object.keys(req.body).length !== 1
    || Object.keys(req.body)[0] !== 'name'
    || typeof Object.values(req.body)[0] !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.addUser(req.body);

  res.status(201).send(newUser).end();
};

const editUser = async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const userToEdit = await User.findAll({
    where: {
      id,
    },
  });

  if (userToEdit.length === 0) {
    res.sendStatus(404).end();

    return;
  }

  if (
    Object.keys(req.body).length !== 1
    || Object.keys(req.body)[0] !== 'name'
    || typeof Object.values(req.body)[0] !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const name = req.body.name;

  const editedUser = await userService.editUser(id, name);

  res.send(editedUser).end();
};

const delUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);

    return;
  }

  const del = await userService.delUser(Number(id));

  if (!del) {
    res.sendStatus(404).end();

    return;
  }

  res.sendStatus(204).end();
};

module.exports = {
  getAll,
  getOne,
  addUser,
  editUser,
  delUser,
};
