const { userService } = require('../services/services');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getSingle = async (req, res) => {
  const user = await userService.getSingle(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.addUser(name);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const deletedUser = await userService.removeUser(req.params.id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const user = await userService.getSingleUser(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await userService.updateUser({
    id: req.params.id,
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  userController: {
    getAll,
    getSingle,
    create,
    deleteUser,
    update,
  },
};
