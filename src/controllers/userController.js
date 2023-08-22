'use strict';

const userServices = require('../servicres/userServices');

const getUsers = async(req, res) => {
  try {
    const users = await userServices.getUsers();

    res.send(users);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getUser = async(req, res) => {
  const { id } = req.params;
  const findUser = userServices.getUser(id);

  if (!findUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findUser);
};

const deleteUser = async(req, res) => {
  const { id } = req.params;
  const removeUser = userServices.getUser(id);

  if (!removeUser) {
    res.sendStatus(404);

    return;
  }

  try {
    await userServices.deleteUser(id);

    res
      .status(204)
      .send({ message: 'User has been deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error occurred while removing the user' });
  }
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res
      .status(400)
      .json({ message: 'Name is required.' });

    return;
  }

  const newUser = await userServices.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const patchedUser = await userServices.getUser(id);

  if (!patchedUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const patchUser = await userServices.updateUser(id, name);

  res
    .status(200)
    .send(patchUser);
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
