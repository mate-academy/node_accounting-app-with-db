import { User } from '../models/User.js';

export function normalize({ id, name }) {
  return { id, name };
}

export async function getUsers() {
  // const users = await client.query('SELECT * FROM users');
  const users = await User.findAll({
    order: ['created_at'],
  });

  return users;
}

export function getUser(id) {
  return User.findByPk(id);
}

export function createUser(name = '') {
  return User.create({ name });
}

export async function removeUser(id) {
  // await client.query(`
  //   DELETE FROM users
  //   WHERE id=$1
  // `, [id]);

  await User.destroy({
    where: { id },
  });
}

export async function updateUser(id, name) {
  // await client.query(`
  //   UPDATE users
  //   SET id=$1, name=$2
  //   WHERE id=$1
  // `, [id, name]);

  // return getUser(id);

  return User.update(
    { name },
    {
      where: {
        id,
      },
    }
  );
}
