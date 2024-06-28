'use strict';

const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');
const { Expense, User } = require('./models/models');

const logger = {
  // ESLint-disable-next-line no-console
  error: console.error,
};

const createServer = () => {
  const app = express();
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'postgres',
  });

  client.connect();

  app.use(morgan('combined'));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello');
  });

  app.get('/users', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM accounting_user');

      res.status(200).send(result.rows);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 36' });
    }
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    try {
      const result = await client.query(
        'INSERT INTO accounting_user (name) VALUES ($1) RETURNING *',
        [name],
      );

      res.status(201).send(result.rows[0]);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 58' });
    }
  });

  app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await client.query(
        'SELECT * FROM accounting_user WHERE id = $1',
        [id],
      );

      if (result.rows.length === 0) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 77' });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await client.query(
        'DELETE FROM accounting_user WHERE id = $1 RETURNING *',
        [id],
      );

      if (result.rows.length === 0) {
        return res.status(404).send('Not found');
      }

      res.sendStatus(204);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 96' });
    }
  });

  app.patch('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    try {
      const result = await client.query(
        'UPDATE accounting_user SET name = $1 WHERE id = $2 RETURNING *',
        [name, id],
      );

      if (result === 0) {
        return res.status(404).send({ error: 'User not found' });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 120' });
    }
  });

  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories } = req.query;
    const conditions = [];
    const params = [];

    if (userId) {
      conditions.push('userId = $1');
      params.push(parseInt(userId, 10));
    }

    if (from) {
      conditions.push('spentAt >= $' + (params.length + 1));
      params.push(new Date(from));
    }

    if (to) {
      conditions.push('spentAt <= $' + (params.length + 1));
      params.push(new Date(to));
    }

    if (categories) {
      const categoriesArray = categories.split(',');
      const placeholders = categoriesArray.map(
        (_, index) => '$' + (params.length + index + 1),
      );

      conditions.push(`category IN (${placeholders.join(', ')})`);
      params.push(...categoriesArray);
    }

    let query = 'SELECT * FROM accounting_expenses';

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    try {
      const result = await client.query(query, params);

      res.status(200).json(result.rows);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 165' });
    }
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;


    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const user = await client.query(
        'SELECT * FROM accounting_user WHERE id = $1',
        [userId]);

      if (!user.rows[0]) {
        return res.status(400).json({ error: 'User not found' });
      }

      const expense = await Expense.create({
        spentAt,
        title,
        amount,
        category,
        userId,
        note,
      });

      res.status(201).json(expense);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      // console.log('Error inserting expense: ', err);
      logger.error('Error inserting expense:', err);
      res.status(500).json({ error: 'Internal Server Error 200' });
    }
  });

  app.get('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const expense = await client.query(
        'SELECT * FROM accounting_expenses WHERE id=$1',
        [id],
      );

      if (!expense.rows.length) {
        return res.status(400).json({ error: 'User not found' });
      }
      res.status(200).send(expense);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).json({ error: 'Internal Server Error 218' });
    }
  });

  app.patch('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, amount, category, note } = req.body;

    const fieldsToUpdate = [];
    const params = [];

    if (title) {
      fieldsToUpdate.push(`title = $${fieldsToUpdate.length + 1}`);
      params.push(title);
    }

    if (amount) {
      fieldsToUpdate.push(`amount = $${fieldsToUpdate.length + 1}`);
      params.push(amount);
    }

    if (category) {
      fieldsToUpdate.push(`category = $${fieldsToUpdate.length + 1}`);
      params.push(category);
    }

    if (note) {
      fieldsToUpdate.push(`note = $${fieldsToUpdate.length + 1}`);
      params.push(note);
    }
    params.push(id);

    if (fieldsToUpdate.length === 0) {
      return res.status(400).send({ error: 'No fields to update' });
    }

    const query = `
      UPDATE accounting_expenses
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = $${params.length}
      RETURNING *
    `;

    try {
      const result = await client.query(query, params);

      if (result.rows.length === 0) {
        return res.status(404).send({ error: 'Expense not found' });
      }

      res.status(200).send(result.rows[0]);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).send({ error: 'Internal Server Error 270' });
    }
  });

  app.delete('/expenses/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
      const result = await client.query(
        'DELETE  FROM accounting_expenses WHERE id=$1 RETURNING *',
        [id],
      );

      if (!result.rows.length) {
        return res.status(400).json({ error: 'User not found' });
      }
      res.sendStatus(204);
    } catch (err) {
      logger.error('Error inserting expense:', err);
      res.status(500).json({ error: 'Internal Server Error 288' });
    }
  });

  return app;
};

module.exports = {
  createServer,
};
