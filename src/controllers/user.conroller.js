const userService = require('../services/user.service');

async function getAll(_req, res) {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function getOne(req, res) {
  const { id } = req.params;

  try {
    const user = await userService.getUser(+id);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function createOne(req, res) {
  const userData = req.body;

  try {
    const user = await userService.createUser(userData);

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function updateOne(req, res) {
  const { id } = req.params;
  const userData = req.body;

  try {
    const user = await userService.updateUser(+id, userData);

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function deleteOne(req, res) {
  const { id } = req.params;

  try {
    const success = await userService.deleteUser(+id);

    if (success) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
