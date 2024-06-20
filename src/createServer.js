/* eslint-disable no-console */
'use strict';

const express = require('express');
const { sequelize } = require('./db.js');
const { Op } = require('sequelize');
const {
  models: { Expense, User },
} = require('./models/models.js');

async function getById(id, type) {
  try {
    const model = type === 'expense' ? Expense : User;
    const record = await model.findByPk(id);

    if (!record) {
      return { e: 'notFound' };
    }

    return record;
  } catch (error) {
    return { e: 'internal' };
  }
}

function createServer() {
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('connected');
      await sequelize.sync({});
      console.log('synced');
    } catch (error) {
      throw new Error(error);
    }
  })();

  const server = express();

  server.get('/users', (_, res) => {
    User.findAll()
      .then((allUsers) => {
        res.send(allUsers);
      })
      .catch((r) => {
        res.status(500).send('Unexpected Error');
      });
  });

  server.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const targetUser = await getById(userId);

    if (targetUser?.e === 'notFound') {
      res.status(404).send('User not found');
    } else if (targetUser?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      res.send(targetUser);
    }
  });

  server.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    User.create({
      name,
    })
      .then((newUser) => {
        res.status(201).send(newUser);
      })
      .catch((r) => {
        if (r.name === 'SequelizeValidationError') {
          res.status(400).send('Name required!');

          return;
        }
        res.status(500).send('Unexpected Error');
      });
  });

  server.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    const targetUser = await getById(userId);

    if (targetUser?.e === 'notFound') {
      res.status(404).send('User not found');
    } else if (targetUser?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      targetUser
        .destroy()
        .then(() => {
          res.sendStatus(204);
        })
        .catch(() => {
          res.status(500).send('Unexpected Error');
        });
    }
  });

  server.patch('/users/:userId', express.json(), async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const targetUser = await getById(userId);

    if (targetUser?.e === 'notFound') {
      res.status(404).send('User not found');
    } else if (targetUser?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      targetUser.name = name;

      targetUser
        .save()
        .then((newUser) => {
          res.status(200).send(newUser);
        })
        .catch(() => {
          res.status(500).send('Unexpected Error');
        });
    }
  });

  server.get('/expenses', (req, res) => {
    const { userId, categories, to, from } = req.query;

    Expense.findAll({
      where: {
        ...(userId && { userId }),
        ...(categories && { category: categories }),
        ...((from || to) && {
          spentAt: {
            ...(from && { [Op.gte]: new Date(from) }),
            ...(to && { [Op.lte]: new Date(to) }),
          },
        }),
      },
    })
      .then((allExpenses) => {
        res.send(allExpenses);
      })
      .catch((r) => {
        console.log(r);
        res.status(500).send('Unexpected Error');
      });
  });

  server.get('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    const targetExpense = await getById(expenseId, 'expense');

    if (targetExpense?.e === 'notFound') {
      res.status(404).send('Expense not found');
    } else if (targetExpense?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      res.send(targetExpense);
    }
  });

  server.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const targetUser = await getById(userId);

    if (targetUser?.e === 'notFound') {
      res.status(400).send('User not found');

      return;
    } else if (targetUser?.e === 'internal') {
      res.status(500).send('Unexpected Error');

      return;
    }

    Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    })
      .then((newExpense) => {
        res.status(201).send(newExpense);
      })
      .catch((r) => {
        if (r.name === 'SequelizeValidationError') {
          console.log(r);
          res.status(400).send('Fields required!');

          return;
        }

        console.log(r);
        res.status(500).send('Unexpected Error');
      });
  });

  server.delete('/expenses/:expenseId', async (req, res) => {
    const { expenseId } = req.params;

    const targetExpense = await getById(expenseId, 'expense');

    if (targetExpense?.e === 'notFound') {
      res.status(404).send('User not found');
    } else if (targetExpense?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      targetExpense
        .destroy()
        .then(() => {
          res.sendStatus(204);
        })
        .catch(() => {
          res.status(500).send('Unexpected Error');
        });
    }
  });

  server.patch('/expenses/:expenseId', express.json(), async (req, res) => {
    const { expenseId } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const targetExpense = await getById(expenseId, 'expense');

    if (targetExpense?.e === 'notFound') {
      res.status(404).send('User not found');
    } else if (targetExpense?.e === 'internal') {
      res.status(500).send('Unexpected Error');
    } else {
      if (userId) {
        targetExpense.userId = userId;
      } else if (spentAt) {
        targetExpense.spentAt = spentAt;
      } else if (title) {
        targetExpense.title = title;
      } else if (amount) {
        targetExpense.amount = amount;
      } else if (category) {
        targetExpense.category = category;
      } else if (note) {
        targetExpense.note = note;
      }

      targetExpense
        .save()
        .then((newExpense) => {
          res.status(200).send(newExpense);
        })
        .catch(() => {
          res.status(500).send('Unexpected Error');
        });
    }
  });

  return server;
}

module.exports = {
  createServer,
};
