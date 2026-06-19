const { models } = require('../models/models');
const { ent } = require('../static/vocab');
const { get, patch } = require('./general.service');
const { NotFoundError } = require('../errors');

// const allowedList = [fields[ent.usr].name];

const getUser = async (id = null) => get(ent.usr, id);

const postUser = async (body) => {
  const user = await models.User.create({ ...body });

  return user;
};

const deleteUser = async (id) => {
  const user = await get(ent.usr, id);

  if (user === null) {
    throw new NotFoundError(ent.usr, id);
  }

  await user.destroy();

  return true;
};

const patchUser = async (id, body) => patch(ent.usr, id, body);

module.exports = {
  getUser,
  postUser,
  deleteUser,
  patchUser,
};
