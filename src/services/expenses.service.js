const { sequelize } = require('../db');

const create = ({
  userId,
  spentAt,
  title,
  amount,
  category = null,
  note = null,
}) => {
  return sequelize.query(
    `
      INSERT INTO expenses (user_id, spent_at, title, amount, category, note)
      VALUES (:userId, :spentAt, :title, :amount, :category, :note)
      RETURNING id, user_id AS "userId", spent_at AS "spentAt", title, amount, category, note
    `,
    {
      replacements: {
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      },
    },
  );
};

const getAll = ({ categories, from, to, userId }) => {
  let sql = `
    SELECT id, user_id AS "userId", spent_at AS "spentAt", title, amount, category, note
    FROM expenses
  `;
  const conditions = [];
  const replacements = {};

  if (userId) {
    conditions.push('user_id = :userId');
    replacements.userId = userId;
  }

  if (categories) {
    conditions.push('category IN (:categories)');

    replacements.categories = categories
      .split(',')
      .map((category) => category.trim());
  }

  if (from) {
    conditions.push('spent_at >= :from');
    replacements.from = from;
  }

  if (to) {
    conditions.push('spent_at <= :to');
    replacements.to = to;
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  return sequelize.query(sql, { replacements });
};

const get = (id) => {
  return sequelize.query(
    `
      SELECT id, user_id AS "userId", spent_at AS "spentAt", title, amount, category, note
      FROM expenses
      WHERE id = ?
    `,
    { replacements: [id] },
  );
};

const patch = (id, { spentAt, title, amount, category, note }) => {
  let sql = 'UPDATE expenses SET ';
  const toUpdate = [];
  const replacements = { id };

  if (spentAt) {
    toUpdate.push('spent_at = :spentAt');
    replacements.spentAt = spentAt;
  }

  if (title) {
    toUpdate.push('title = :title');
    replacements.title = title;
  }

  if (amount) {
    toUpdate.push('amount = :amount');
    replacements.amount = amount;
  }

  if (category) {
    toUpdate.push('category = :category');
    replacements.category = category;
  }

  if (note) {
    toUpdate.push('note = :note');
    replacements.note = note;
  }

  sql +=
    toUpdate.join(', ') +
    ` WHERE id = :id RETURNING id, user_id AS "userId", spent_at AS "spentAt", title, amount, category, note`;

  return sequelize.query(sql, { replacements });
};

const remove = (id) => {
  return sequelize.query(
    `
      DELETE FROM expenses
      WHERE id = ?
    `,
    { replacements: [id] },
  );
};

module.exports = {
  create,
  getAll,
  get,
  patch,
  remove,
};
