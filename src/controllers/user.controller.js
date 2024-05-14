const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');
const { ERRORS } = require('../utils/errors');

const get = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send(ERRORS.userNotFound);
    }

    res.send(user);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  try {
    if (userHelpers.validateName(name)) {
      return res.status(400).send(ERRORS.nameRequired);
    }

    const newUser = await userService.create(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send(ERRORS.userNotFound);
    }

    userService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send(ERRORS.userNotFound);
    }

    if (userHelpers.validateName(name)) {
      return res.status(400).send(ERRORS.nameRequired);
    }

    const updatedUser = await userService.update({ id, name });

    res.send(updatedUser);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
