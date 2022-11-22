'use strict';

import { v4 as uuid } from 'uuid';
import { User } from './user-model.js';

export const normilize = ({ id, name }) => {
  return { id, name };
};

export async function getAll() {
  return await User.findAll({
    order: ['created_at']
  });
}

export function getById(userId) {
  return User.findByPk(userId);
}

export function create(name) {
  const id = uuid();
  const newUser = User.create({
    id,
    name,
  });

  return newUser;
}

export async function update({ userId: id, name }) {
  return await User.update({ name }, {
    where: { id },
  });
}

export async function remove(id) {
  try {
    await User.destroy({
      where: { id }
    });

    return true;
  } catch {
    return false;
  }
}
