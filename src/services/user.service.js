'use strict';

const { User } = require('../models/models').models;

const getOne = async(id) => User.findByPk(id);
const getAll = async() => User.findAll();
const remove = async(id) => User.destroy({ where: { id } });

const create = async(name) => {
  return User.create({
    name,
  });
};

const update = (id, name) => {
  return User.update({ name }, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  });
};

module.exports = {
  getOne,
  getAll,
  remove,
  create,
  update,
};
