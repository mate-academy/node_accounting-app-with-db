const userService = require('../service/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userbyId = await userService.getById(id);

    if (!userbyId) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(userbyId);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

const addUser = async (req, res) => {
  const { name } = req.body;

  try {
    const newUser = await userService.create(name);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('User not added!');
  }
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const updated = await userService.update(name, id);

    if (updated === 0) {
      return res.status(404).send('user for update not found');
    }

    const userbyId = await userService.getById(id);

    if (!userbyId) {
      return res.status(404).send('User not found after update');
    }

    res.status(200).send(userbyId);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await userService.remove(id);

    if (deletedCount === 0) {
      return res.status(404).send('User not exist!');
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
