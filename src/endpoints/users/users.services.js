const { User } = require('../../models/User.model');
const getAll = async () => {
  const users = await User.findAll({ order: ['id'] });

  return users;
};

const getOne = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async (name) => {
  const users = await User.findAll();

  const newUser = await User.create({ id: users.length, name });

  return newUser;
};

const update = async (name, id) => {
  await User.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
