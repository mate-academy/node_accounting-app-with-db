'use strict';

const client = require('../utils/database');

class Expense {
  static async findAll() {
    const result = await client.query(`
    SELECT *
    FROM expenses
  `);

    return result.rows;
  }

  static async findById(id) {
    const result = await client.query(
      `
      SELECT *
      FROM expenses
      WHERE id = $1
    `,
      [id]
    );

    return result.rows[0] || null;
  }

  static async create(userId, spentAt, title, amount, category, note) {
    const id = (await this.findAll()).length + 1;

    await client.query(
      `
     INSERT INTO expenses (id, user_id, spent_at, title, amount, category, note)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
      [id, userId, spentAt, title, amount, category, note]
    );

    const newExpense = await this.findById(id);

    return newExpense;
  }

  static async remove(expenseId) {
    await client.query(
      `
      DELETE FROM expenses
      WHERE id=$1
    `,
      [expenseId]
    );
  }

  static async update(expenseId, updates) {
    const { spentAt, title, amount, category, note } = updates;

    await client.query(`
      UPDATE expenses
      SET spent_at = COALESCE($1, spent_at),
        title = COALESCE($2, title),
        amount = COALESCE($3, amount),
        category = COALESCE($4, category),
        note = COALESCE($5, note)
        
      WHERE id = $6
    `, [spentAt, title, amount, category, note, expenseId]
    );

    const updatedExpense = await this.findById(expenseId);

    return updatedExpense;
  }
}

module.exports = Expense;
