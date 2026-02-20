import { User } from '../models/User.model.mjs';

const getAll = async () => {
  const res = await User.findAll({
    raw: true,
  });

  return res;
};

const getById = async (id) => {
  const res = await User.findByPk(id);

  return res;
};

const create = async (name) => {
  const res = await User.create({
    name,
  });

  return res;
};

const deleteUser = async (id) => {
  const res = await User.destroy({
    where: {
      id,
    },
  });

  return res;
};

const update = async (id, name) => {
  const res = await User.update(
    { name },
    {
      where: {
        id,
      },
      returning: true,
      raw: true,
    },
  );

  return res[1];
};

export default {
  getAll,
  getById,
  create,
  deleteUser,
  update,
};
