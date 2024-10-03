const userService = require('./../services/user.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.send(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const user = await userService.createUser(name);

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (typeof name !== 'string') {
      return res.status(422).send('Invalid name');
    }

    const updatedUser = await userService.updateUser({ id, name });

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    await userService.removeUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
