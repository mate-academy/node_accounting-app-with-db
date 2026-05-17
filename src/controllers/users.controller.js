const userService = require('./../services/users.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.send(users);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await userService.removeUserById(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const addUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.createUserByName(name);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const user = await userService.getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = await userService.updateUserData({ id, name });

    res.send(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  removeUser,
  addUser,
  updateUser,
};
