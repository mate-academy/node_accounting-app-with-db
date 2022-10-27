'use strict';

const { client } = require('../utils/db');

function normalize({
  id,
  user_id: userId,
  spent_at: spentAt,
  title,
  amount,
  category,
  note,
}) {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

async function getMany(userId, category, from, to) {
  const queryArray = [];
  const parametersArray = [...arguments].filter(parameter => parameter).length
    ? [...arguments]
    : [];

  queryArray.push(userId ? 'user_id=$1' : '');
  queryArray.push(category ? 'category=$2' : '');
  queryArray.push(from ? 'spent_at>$3' : '');
  queryArray.push(to ? 'spent_at<$4' : '');

  const queryString = queryArray
    .filter(query => query)
    .join(' AND ')
      || 'id>0';

  const result = await client.query(`
    SELECT *
    FROM expenses
    WHERE ${queryString}
    ORDER BY id
    `, [...parametersArray]
  );

  return result.rows;
}

async function getOne(expenseId) {
  const result = await client.query(`
    SELECT *
    FROM expenses
    WHERE id=$1
    `, [expenseId]
  );

  return result.rows[0] || null;
}

async function create(...values) {
  const valuesString = values
    .map((arg, i) => `$${i + 1}`)
    .join(',');

  await client.query(`
    INSERT INTO expenses(user_id, spent_at, title, amount, category, note)
    VALUES (${valuesString})
    `, [...values]
  );

  const result = await client.query(`
    SELECT *
    FROM expenses
    ORDER BY id DESC
    LIMIT 1
  `);

  return result.rows[0];
}

async function remove(expenseId) {
  const foundedExpenses = await getOne(expenseId);

  await client.query(`
    DELETE
    FROM expenses
    WHERE id=$1
    `, [expenseId]
  );

  return foundedExpenses;
}

async function update(expenseId, newData) {
  const expenseForUpdate = normalize(await getOne(expenseId));
  const newDataArray = [];

  for (const key in expenseForUpdate) {
    newDataArray.push(newData[key] || expenseForUpdate[key]);
  }

  await client.query(`
    UPDATE expenses
    SET user_id=$2, spent_at=$3, title=$4, amount=$5, category=$6, note=$7
    WHERE id=$1
    `, [...newDataArray]
  );

  const updatedExpense = await getOne(expenseId);

  return updatedExpense;
}

module.exports = {
  getMany,
  getOne,
  create,
  remove,
  update,
  normalize,
};
