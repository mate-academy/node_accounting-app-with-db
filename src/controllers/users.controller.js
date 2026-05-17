const usersModel = require('../services/users.js');
const { normalizeUser } = require('../services/normalize.js');

async function getAllUsers(req, res) {
  try {
    const users = await usersModel.getAllUsers();

    res.status(200).json(users.map((user) => normalizeUser(user)));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати користувачів' });
  }
}

async function getUser(req, res) {
  try {
    const userId = +req.params.userId;
    const user = await usersModel.getUser(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `Користувача ${userId} не знайдено` });
    }

    res.status(200).json(normalizeUser(user));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати користувача' });
  }
}

async function postUser(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = await usersModel.createUser(name);

    res.status(201).json(normalizeUser(newUser));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити користувача' });
  }
}

async function removeUser(req, res) {
  try {
    const userId = +req.params.userId;
    const removedUser = await usersModel.removeUser(userId);

    if (!removedUser) {
      return res
        .status(404)
        .json({ message: `Користувача ${userId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити користувача' });
  }
}

async function updateUser(req, res) {
  try {
    const { name } = req.body;
    const userId = +req.params.userId;

    if (!name) {
      return res.status(400).json({ error: 'New name is required' });
    } else if (!userId) {
      return res.status(400).json({ error: 'UserId is required in URL' });
    }

    const updatedUser = await usersModel.editUser(userId, name);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: 'Не вдалось отримати користувача' });
    }

    res.status(200).json(normalizeUser(updatedUser));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити користувача' });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  postUser,
  removeUser,
  updateUser,
};
