'use strict';

const userServices = require('../services/user.service');
const codeStuses = require('../variables');

const get = async (_, res) => {
  res.statusCode = codeStuses.SUCCESS_CODE_STATUS;
  res.send(await userServices.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const choosedUser = await userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.status(codeStuses.SUCCESS_CODE_STATUS).send(choosedUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(codeStuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  res.statusCode = codeStuses.CREATED_CODE_STATUS;
  res.send(await userServices.create(name));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userServices.getById(id))) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  await userServices.remove(id);

  res.sendStatus(codeStuses.UNDERSTANDING_CODE_STATUS);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const choosedUser = await userServices.getById(id);

  if (!choosedUser) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  const updatedUser = await userServices.update({
    id,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
