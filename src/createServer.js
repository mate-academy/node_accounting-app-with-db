'use strict';

const http = require('http');
const { Op } = require('sequelize');

const {
  models: { User, Expense },
} = require('./models/models');

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (statusCode === 204) {
    res.end();

    return;
  }

  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      if (!body) {
        resolve({});

        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    const path = url.pathname;

    try {
      // USERS

      if (req.method === 'POST' && path === '/users') {
        const body = await getBody(req);

        if (!body.name) {
          sendJson(res, 400, {
            message: 'Name is required',
          });

          return;
        }

        const user = await User.create({
          name: body.name,
        });

        sendJson(res, 201, user.toJSON());

        return;
      }

      if (req.method === 'GET' && path === '/users') {
        const users = await User.findAll();

        sendJson(
          res,
          200,
          users.map((user) => user.toJSON()),
        );

        return;
      }

      const userMatch = path.match(/^\/users\/(\d+)$/);

      if (userMatch) {
        const userId = Number(userMatch[1]);

        if (req.method === 'GET') {
          const user = await User.findByPk(userId);

          if (!user) {
            sendJson(res, 404, {
              message: 'User not found',
            });

            return;
          }

          sendJson(res, 200, user.toJSON());

          return;
        }

        if (req.method === 'PATCH') {
          const user = await User.findByPk(userId);

          if (!user) {
            sendJson(res, 404, {
              message: 'User not found',
            });

            return;
          }

          const body = await getBody(req);

          if (body.name !== undefined) {
            user.name = body.name;

            await user.save();
          }

          sendJson(res, 200, user.toJSON());

          return;
        }

        if (req.method === 'DELETE') {
          const user = await User.findByPk(userId);

          if (!user) {
            sendJson(res, 404, {
              message: 'User not found',
            });

            return;
          }

          await user.destroy();

          sendJson(res, 204);

          return;
        }
      }

      // EXPENSES

      if (req.method === 'POST' && path === '/expenses') {
        const body = await getBody(req);

        const requiredFields = [
          body.spentAt,
          body.title,
          body.amount,
          body.userId,
        ];

        const hasMissingFields = requiredFields.some(
          (field) => field === undefined || field === null,
        );

        if (hasMissingFields) {
          sendJson(res, 400, {
            message: 'Required fields are missing',
          });

          return;
        }

        const user = await User.findByPk(body.userId);

        if (!user) {
          sendJson(res, 400, {
            message: 'User not found',
          });

          return;
        }

        const expense = await Expense.create({
          spentAt: body.spentAt,
          title: body.title,
          amount: body.amount,
          userId: body.userId,
          category: body.category,
          note: body.note,
        });

        sendJson(res, 201, expense.toJSON());

        return;
      }

      if (req.method === 'GET' && path === '/expenses') {
        const userId = url.searchParams.get('userId');
        const from = url.searchParams.get('from');
        const to = url.searchParams.get('to');
        const categories = url.searchParams.get('categories');

        const where = {};

        if (userId) {
          where.userId = Number(userId);
        }

        if (from || to) {
          where.spentAt = {};

          if (from) {
            where.spentAt[Op.gte] = new Date(from);
          }

          if (to) {
            where.spentAt[Op.lte] = new Date(to);
          }
        }

        if (categories) {
          where.category = {
            [Op.in]: categories.split(','),
          };
        }

        const expenses = await Expense.findAll({
          where,
        });

        sendJson(
          res,
          200,
          expenses.map((expense) => expense.toJSON()),
        );

        return;
      }

      const expenseMatch = path.match(/^\/expenses\/(\d+)$/);

      if (expenseMatch) {
        const expenseId = Number(expenseMatch[1]);

        if (req.method === 'GET') {
          const expense = await Expense.findByPk(expenseId);

          if (!expense) {
            sendJson(res, 404, {
              message: 'Expense not found',
            });

            return;
          }

          sendJson(res, 200, expense.toJSON());

          return;
        }

        if (req.method === 'PATCH') {
          const expense = await Expense.findByPk(expenseId);

          if (!expense) {
            sendJson(res, 404, {
              message: 'Expense not found',
            });

            return;
          }

          const body = await getBody(req);

          const fields = [
            'spentAt',
            'title',
            'amount',
            'userId',
            'category',
            'note',
          ];

          for (const field of fields) {
            if (body[field] !== undefined) {
              expense[field] = body[field];
            }
          }

          await expense.save();

          sendJson(res, 200, expense.toJSON());

          return;
        }

        if (req.method === 'DELETE') {
          const expense = await Expense.findByPk(expenseId);

          if (!expense) {
            sendJson(res, 404, {
              message: 'Expense not found',
            });

            return;
          }

          await expense.destroy();

          sendJson(res, 204);

          return;
        }
      }

      sendJson(res, 404, {
        message: 'Not found',
      });
    } catch (error) {
      sendJson(res, 500, {
        message: error.message,
      });
    }
  });
}

module.exports = {
  createServer,
};
