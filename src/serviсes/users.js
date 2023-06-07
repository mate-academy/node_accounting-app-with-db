'use strict';

const { User } = require('../models/users');

const getAll = () => User.findAll({
  order: ['createdAt'],
});

const getById = async(userId) => User.findByPk(userId);

const create = async(name) => User.create({ name });

const remove = async(id) => User.destroy({
  where: {
    id,
  },
});

const update = async({ id }, name) => User.update(
  { name },
  {
    where: { id },
  }
);

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
