const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService
    .getAll()
    .then((usrs) => usrs.map(userService.normalize));

  res.send(users);
};

const getOne = (req, res) => {
  const user = userService.normalize(req.entry);

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  const user = await userService.create(name).then(userService.normalize);

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.entry;

  await userService.remove(id);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.entry;

  await userService.update({ id, name });

  const user = await userService.getById(id).then(userService.normalize);

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
