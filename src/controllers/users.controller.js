const { userSchema } = require('../schemas');
const { dynamicSchema } = require('../utils');
const { usersService } = require('../services');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.json(user);
};

const create = async (req, res) => {
  const { error, value } = userSchema.validate(req.body, {
    allowUnknown: true,
  });

  if (error) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.create(value);

  res.status(201).json(user);
};

const update = async (req, res) => {
  const { id } = req.params;

  const isExist = !!(await usersService.getById(id));

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    res.sendStatus(400);

    return;
  }

  const currentSchema = dynamicSchema(keys, userSchema);
  const { error, value } = currentSchema.validate(req.body);

  if (error) {
    res.sendStatus(400);

    return;
  }
  await usersService.update(id, value);

  const updatedUser = await usersService.getById(id);

  res.json(updatedUser);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const isExist = !!(await usersService.getById(id));

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteById(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
