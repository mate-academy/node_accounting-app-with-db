/* eslint-disable no-console */
const { usersService } = require('./service');

async function getAllUsers(req, res) {
  try {
    const response = await usersService.getAll();

    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function getOneUser(req, res) {
  const userId = req.params.id;

  if (!userId) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await usersService.getById(userId);

    if (!response) {
      res.status(404).json('User not found');
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server error');
  }
}

async function createUser(req, res) {
  const userName = req.body.name;

  if (!userName) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await usersService.addNew(userName);

    res.status(201).json(response);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server error');
  }
}

async function removeUser(req, res) {
  const idToRemove = req.params.id;

  if (!idToRemove) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await usersService.delete(idToRemove);

    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const userNewName = req.body.name;

  if (!userId || !userNewName) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await usersService.update(userId, userNewName);

    if (!response) {
      res.status(404).json('User not found');
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  removeUser,
  updateUser,
};
