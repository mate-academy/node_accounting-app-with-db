/* eslint-disable no-console */
const userService = require('../services/user.service');

const get = async (req, res) => {
  try {
    const users = (await userService.getAll()).map(userService.normalize);

    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while retrieving users.' });
  }
};

const getOne = (req, res) => {
  try {
    const user = userService.normalize(req.entry);

    res.send(user);
  } catch (error) {
    console.error('Error fetching user:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while retrieving the user.' });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required.' });
    }

    const user = userService.normalize(await userService.create(name));

    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while creating the user.' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.entry;

    await userService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting user:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while deleting the user.' });
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.entry;

    if (!name) {
      return res.status(400).send({ error: 'Name is required.' });
    }

    await userService.update({ id, name });

    const user = userService.normalize(await userService.getById(id));

    res.send(user);
  } catch (error) {
    console.error('Error updating user:', error);

    res
      .status(500)
      .send({ error: 'An error occurred while updating the user.' });
  }
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
