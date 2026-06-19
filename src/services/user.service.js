'use strict';

const { models } = require('../models/models');
const { sequelize } = require('../db');

const getAll = async () => {
  const result = await models.User.findAll();

  return result.map((user) => user.get({ plain: true }));
};

const getUserById = async (id) => {
  // eslint-disable-next-line no-return-await
  return (await models.User.findByPk(id)) || null;
};

const create = async (name) => {
  // eslint-disable-next-line no-return-await
  return await models.User.create({ name });
};

const update = async (id, name) => {
  await models.User.update({ name }, { where: { id } });

  // eslint-disable-next-line no-return-await
  return await getUserById(id);
};

const remove = async (id) => {
  await sequelize.query(`DELETE FROM users WHERE id = ?`, {
    replacements: [id],
    type: sequelize.QueryTypes.DELETE,
  });
};

const removeAll = async () => {
  // eslint-disable-next-line no-return-await
  return await models.User.destroy({
    where: {},
    cascade: true,
    restartIdentity: true,
  });
};

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  removeAll,
};
