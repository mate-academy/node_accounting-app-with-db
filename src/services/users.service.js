import { User } from '../models/models.js';

export const getAll = async () => {
  return await User.findAll();
};

export const getById = async (id) => {
  return Users.findByPk(id);
};

export const create = (name) => {
  return Users.create({ name });
};

export const update = async ({ id, name }) => {
  await Users.update({ name }, { where: { id } });
};

export const remove = (id) => {
  Users.destroy({where: {id}})
};
