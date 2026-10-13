const { sequelize } = require('../db');

const create = (name) => {
  return sequelize.query(
    `
      INSERT INTO users (name)
      VALUES (?)
      RETURNING *
    `,
    {
      replacements: [name],
    },
  );
};

const getAll = () => {
  return sequelize.query(
    `
      SELECT * FROM users
    `,
  );
};

const get = (id) => {
  return sequelize.query(
    `
      SELECT * FROM users
      WHERE id = ?
    `,
    {
      replacements: [id],
    },
  );
};

const patch = (id, name) => {
  return sequelize.query(
    `
      UPDATE users
      SET name = ?
      WHERE id = ?
      RETURNING *
    `,
    {
      replacements: [name, id],
    },
  );
};

const remove = (id) => {
  return sequelize.query(
    `
      DELETE FROM users
      WHERE id = ?
    `,
    {
      replacements: [id],
    },
  );
};

module.exports = {
  create,
  getAll,
  get,
  patch,
  remove,
};
