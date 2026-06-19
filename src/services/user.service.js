const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const add = (user) => {
  return User.create(user);
};

const remove = async (id) => {
  await User.destroy({
    where: { id },
  });
};

const update = async (newUser) => {
  const user = await User.findByPk(newUser.id);

  if (!user) {
    return;
  }

  await user.update({ name: newUser.name });

  const updated = user.get({ plain: true });

  return updated;
};

const userService = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  userService,
};
