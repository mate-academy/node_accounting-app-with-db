'use strict';

const client = require('../utils/database');

class User {
  static async findAll() {
    const result = await client.query(`
    SELECT *
    FROM users
  `);

    return result.rows;
  }

  static async findById(id) {
    const result = await client.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
    `,
      [id]
    );

    return result.rows[0] || null;
  }

  static async create(name) {
    const id = (await this.findAll()).length + 1;

    await client.query(
      `
      INSERT INTO users (id, name)
      VALUES ($1, $2)
    `,
      [id, name]
    );

    const newUser = await this.findById(id);

    return newUser;
  }

  static async remove(userId) {
    await client.query(
      `
      DELETE FROM users
      WHERE id=$1
    `,
      [userId]
    );
  }

  static async update(id, name) {
    await client.query(`
      UPDATE users
      SET name=$2
      WHERE id=$1
     `, [id, name]
    );

    const updatedUser = await this.findById(id);

    return updatedUser;
  }
}

module.exports = User;
