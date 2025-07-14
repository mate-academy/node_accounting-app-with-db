import { User } from '../models/User.model.js';

export const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

export const getUserById = (id) => {
  const result = User.findByPk(id);

  return result;
};

export const createUser = async (name) => {
  const user = await User.create({
    name,
  });

  return user;
};

export const updatedUser = async ({ id, name }) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );
};

export const deleteUser = async (id) => {
  const result = User.destroy({
    where: {
      id,
    },
  });

  return result;
};
