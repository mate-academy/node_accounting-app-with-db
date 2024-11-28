const usersService = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching users',
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'User ID is required',
      });

      return;
    }

    const user = await usersService.getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: 'An error occurred while fetching the user',
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;

    if (!user.name) {
      res.status(400).json({
        message: 'Name is required',
      });

      return;
    }

    const newUser = await usersService.create(user);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Name is required') {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: 'An error occurred while creating the user',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;

    const updatedUser = await usersService.update(id, user);

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: 'An error occurred while updating the user',
      error: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        message: 'User ID is required',
      });

      return;
    }

    await usersService.remove(id);

    res.status(204).end();
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      message: 'An error occurred while deleting the user',
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
