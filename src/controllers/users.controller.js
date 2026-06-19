const usersService = require('../services/users.service');

async function getUsers(req, res) {
  res.send(await usersService.getAll());
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const response = await usersService.getOne(id);

    if (response) {
      res.send(response);

      return;
    }

    res.sendStatus(404);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function createUser(req, res) {
  try {
    const name = req.body.name;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const data = await usersService.addUser(name);

    res.statusCode = 201;
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    try {
      const deletedUser = await usersService.getOne(id);

      if (!deletedUser.dataValues.id) {
        throw Error;
      }
    } catch (error) {
      res.sendStatus(404);

      return;
    }

    await usersService.deleteUser(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const userToUpdate = usersService.getOne(id);
    const newUser = { ...userToUpdate, ...data };

    const returnedData = await usersService.updateUser(id, newUser);

    res.send(returnedData);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
};
