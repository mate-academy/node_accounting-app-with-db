const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getOne(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const createUser = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Name is required');
  }

  try {
    const newUser = await userService.createUser(req.body);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getOne(id);

    if (!user) {
      return res.sendStatus(404);
    }

    const updatedUser = await userService.updateUser(id, req.body);

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getOne(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await userService.removeUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
