import { User } from '../../db/models/user.js';

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getOne = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async({ name }) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = async(id) => {
  await User.destroy({
    where: { id },
  });
};

const update = async({ id, name }) => {
  const updatedUser = await User.update(
    { name },
    {
      where: { id },
    });

  return updatedUser;
};

export {
  getAll,
  getOne,
  create,
  remove,
  update,
};
