const { models } = require('../models/models');
const User = models.User;

const getAll = async () => {
  const data = await User.findAll();

  return data;
};

const getOne = async (id) => {
  return User.findByPk(id);
};

const add = async (name) => {
  const newTodo = await User.create({ name });

  return newTodo;
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
