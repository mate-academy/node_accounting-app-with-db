const { models } = require('../models/models.js');
const User = models.User;

const getAll = () => {
  return User.findAll();
};

const create = ({ name }) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const remove = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const update = (id, { name }) => {
  return User.update({ name }, { where: { id }, returning: true });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
