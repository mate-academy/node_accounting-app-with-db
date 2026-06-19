const { User } = require("../models/User.model");

const getAll = async () => {
  const users = await User.findAll();
  return users;
}

const add = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
}

const get = (id) => {
  return User.findByPk(+id);
}

const remove = async (id) => {
  const deletedNumber = await User.destroy({
    where: { id }
  });

  return deletedNumber;
}

const update = async (id, name) => {
  const [updatedRows] = await User.update({ name }, { where: { id } });

  if (updatedRows === 0) {
    return false;
  }

  const updatedUser = await User.findByPk(id);

  return updatedUser;
}

module.exports = {
  getAll,
  add,
  get,
  remove,
  update
}