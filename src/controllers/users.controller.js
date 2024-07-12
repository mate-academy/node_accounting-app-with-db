const services = require('../services/users.service.js');

const getAllUsers = async (req, res) => {
  try {
    const users = await services.getAllUsersService();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await services.getUserByIdService(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });

    return;
  }

  try {
    const newUser = await services.createUserService({ name });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const user = await services.getUserByIdService(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await services.updateUserService(+id, name);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await services.getUserByIdService(+id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });

      return;
    }
    await services.deleteUserService(+id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateUser,
  deleteUser,
};
