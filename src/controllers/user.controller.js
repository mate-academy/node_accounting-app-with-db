const userService = require('../services/user.service');
const userHelpers = require('../helpers/user.helpers');
const {
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND_ERROR,
} = require('../utils/config');

const get = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (error) {
    res.status(500).send({ INTERNAL_SERVER_ERROR });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).send({ USER_NOT_FOUND_ERROR });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ INTERNAL_SERVER_ERROR });
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  try {
    if (userHelpers.validateName(name, res)) {
      return;
    }

    const newUser = await userService.create(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ INTERNAL_SERVER_ERROR });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send({ USER_NOT_FOUND_ERROR });
    }

    userService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ INTERNAL_SERVER_ERROR });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const userExists = await userService.getUserById(id);

    if (!userExists) {
      return res.status(404).send({ USER_NOT_FOUND_ERROR });
    }

    if (userHelpers.validateName(name, res)) {
      return;
    }

    const updatedUser = await userService.update({ id, name });

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  create,
  get,
  getOne,
  update,
  remove,
};
