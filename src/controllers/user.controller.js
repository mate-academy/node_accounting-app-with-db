const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');

const get = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.send(users.map((user) => userHelpers.normalize(user)));
  } catch (error) {
    res.status(500).send({ error: 'Failed to get users try again' });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    return;
  }

  try {
    const user = await userService.getById(id);

    res.send(userHelpers.normalize(user));
  } catch (error) {
    res.status(500).send({ error: 'Failed to get user try again' });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (userHelpers.nameCheck(name, res)) {
    return;
  }

  try {
    const user = await userService.create(name);

    res.status(201).send(userHelpers.normalize(user));
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user try again' });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (await userHelpers.isUserExist(id, res)) {
    return;
  }

  try {
    await userService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: 'Failed to remove user try again' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (
    (await userHelpers.isUserExist(id, res)) ||
    userHelpers.nameCheck(name, res)
  ) {
    return;
  }

  try {
    const updatedUser = await userService.update({ id, name });

    res.send(userHelpers.normalize(updatedUser));
  } catch (error) {
    res.status(500).send({ error: 'Failed to update user try again' });
  }
};

module.exports = {
  get,
  create,
  remove,
  update,
  getOne,
};
