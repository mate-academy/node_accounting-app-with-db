import { User } from '../models/User.js';

export function getAll() {
  return User.findAll({
    order: ['id'],
  });
}

export function getById(userId) {
  return User.findByPk(userId);
}

export function create(name) {
  return User.create({ name });
}

export async function remove(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
}

export async function update(userId, newName) {
  await User.update({ name: newName }, {
    where: {
      id: userId,
    },
  });

  return getById(userId);
}
