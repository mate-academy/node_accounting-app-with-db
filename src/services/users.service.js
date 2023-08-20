/* eslint-disable no-console */

import { User } from '../models/User.js';

async function getAll() {
  const users = await User.findAll({
    attributes: ['id', 'name'],
    order: ['name'],
  });

  return users;
}

async function getOne(id) {
  return User.findByPk(id, {
    attributes: ['id', 'name'],
  });
}

async function createOne(name) {
  const newUser = await User.create({
    name,
  });

  return { id: newUser.id, name: newUser.name };
}

async function updateOne(id, name) {
  const updatedUser = await User.update(
    {
      name,
    },
    {
      where: { id },
      returning: ['id', 'name'],
    },
  );

  return updatedUser[1][0];
}

async function deleteOne(id) {
  return User.destroy({
    where: { id },
  });
}

export { getAll, getOne, createOne, deleteOne, updateOne };
