const userService = require('../services/user.service.js');
const statuses = require('../utils/responseUtils.js');

const getAllUsers = (req, res) => {
  res.status(statuses.OK.code).send(userService.getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: name is required');

    return;
  }

  res.status(statuses.CREATED.code).send(userService.createUser(name));
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: id is required');

    return;
  }

  const user = userService.getUserById(+id);

  if (!user) {
    res
      .status(statuses.NOT_FOUND.code)
      .send(`Not Found: user with id ${id} does not exist`);

    return;
  }

  res.status(statuses.OK.code).send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: id is required');

    return;
  }

  if (!userService.getUserById(+id)) {
    res
      .status(statuses.NOT_FOUND.code)
      .send(`Not Found: user with id ${id} does not exist`);

    return;
  }

  userService.deleteUser(+id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: id is required');

    return;
  }

  if (!name) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: name is required');

    return;
  }

  if (!userService.getUserById(+id)) {
    res
      .status(statuses.NOT_FOUND.code)
      .send(`Not Found: user with id ${id} does not exist`);

    return;
  }

  res.status(statuses.OK.code).send(userService.updateUser(+id, name));
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
