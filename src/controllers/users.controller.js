const userService = require('../services/users.service.js');
const { userDto } = require('./dto/user.dto.js');
const { usersDto } = require('./dto/users.dto.js');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    return users.length > 0
      ? res.status(200).send(usersDto(users))
      : res.status(200).send(users);
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad request');
  }

  try {
    const { dataValues: newUser } = await userService.add(name);

    return res.status(201).send(userDto(newUser));
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  try {
    const user = await userService.get(+id);

    return user
      ? res.status(200).send(userDto(user))
      : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  try {
    const user = await userService.remove(+id);

    return user ? res.sendStatus(204) : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad request');
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const [_, [user]] = await userService.update(+id, name);

    return user
      ? res.status(200).send(userDto(user))
      : res.status(404).send('Not found');
  } catch (error) {
    return res.status(500).send('Server error');
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
};
