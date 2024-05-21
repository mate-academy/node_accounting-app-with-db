const { STATUS } = require('../utils/statusCodes');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();
  const normaliseUsers = users.map((user) => usersService.normalise(user));

  res.status(STATUS.OK).send(normaliseUsers);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const user = await usersService.getOneById(id);

  if (!user) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  res.status(STATUS.OK).send(usersService.normalise(user));
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const newUser = await usersService.create(name);

  res.status(STATUS.CREATED).send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters.');

    return;
  }

  const user = await usersService.getOneById(id);

  if (!user) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  await usersService.remove(id);

  res
    .status(STATUS.NO_CONTENT)
    .send(`The user with ${id} ID was successfully deleted.`);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string' || isNaN(Number(id))) {
    res
      .status(STATUS.BAD_REQUEST)
      .send('Incorrect or missing request parameters or data.');

    return;
  }

  const user = await usersService.update(id, name);

  if (!user) {
    res.status(STATUS.NOT_FOUND).send('The user with this ID does not exist.');

    return;
  }

  res.status(STATUS.OK).send(user);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
