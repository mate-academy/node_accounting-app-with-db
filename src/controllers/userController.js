const userService = require('../services/userService');

const getUsersHandler = async (req, res) => {
  const result = await userService.getAllUsers();

  if (result.error) {
    return res.status(500).send(result.error);
  }

  res.send(result.data);
};

const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;

  const result = await userService.getUserById(+id);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.send(result.data);
};

const createUserHandler = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    // console.log('No user name provided(controller)');
    return res.sendStatus(400);
  }

  const result = await userService.createUser(name);

  if (result.error) {
    // console.log('Error: ', result.error);
    return res.sendStatus(400);
  }

  return res.status(201).send(result.data);
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  const result = await userService.deleteUser(id);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  const result = await userService.updateUser(id, name);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.status(200).send(result.data);
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler,
};
