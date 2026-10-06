'use strict';

/*eslint-disable*/

const http = require('http');
const { Op } = require('sequelize');

const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

const readBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
};

const sendJson = (res, statusCode, data) => {
  res.statusCode = statusCode;

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  res.end(JSON.stringify(data));
};

const createServer = () => {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const pathname = url.pathname;

    const [, resource, chosenId] = pathname.split('/');

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS',
    );

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();

      return;
    }

    try {
      if (req.method === 'POST' && pathname === '/users') {
        const body = await readBody(req);

        if (!body.name) {
          sendJson(res, 400, {
            message: 'Name is required',
          });

          return;
        }

        const user = await User.create({
          name: body.name,
        });

        sendJson(res, 201, user);

        return;
      }

      // Get all users
      if (req.method === 'GET' && pathname === '/users') {
        const users = await User.findAll();

        sendJson(res, 200, users);

        return;
      }

      // Get one user
      if (req.method === 'GET' && resource === 'users' && chosenId) {
        const user = await User.findByPk(chosenId);

        if (!user) {
          sendJson(res, 404, {
            message: 'User not found',
          });

          return;
        }

        sendJson(res, 200, user);

        return;
      }

      // Update user
      if (req.method === 'PATCH' && resource === 'users' && chosenId) {
        const body = await readBody(req);

        const user = await User.findByPk(chosenId);

        if (!user) {
          sendJson(res, 404, {
            message: 'User not found',
          });

          return;
        }

        if (!body.name) {
          sendJson(res, 400, {
            message: 'Name is required',
          });

          return;
        }

        await user.update({
          name: body.name,
        });

        sendJson(res, 200, user);

        return;
      }

      // Delete user
      if (req.method === 'DELETE' && resource === 'users' && chosenId) {
        const user = await User.findByPk(chosenId);

        if (!user) {
          sendJson(res, 404, {
            message: 'User not found',
          });

          return;
        }

        await user.destroy();

        res.statusCode = 204;
        res.end();

        return;
      }



      // POST /expenses
      if (req.method === 'POST' && pathname === '/expenses') {
        const body = await readBody(req);

        const { spentAt, title, amount, userId, category, note } = body;

        if (!spentAt || !title || amount === undefined || !userId) {
          sendJson(res, 400, {
            message: 'spentAt, title, amount and userId are required',
          });

          return;
        }

        const user = await User.findByPk(userId);

        if (!user) {
          sendJson(res, 400, {
            message: 'User not found',
          });

          return;
        }

        const expense = await Expense.create({
          spentAt,
          title,
          amount,
          userId,
          category,
          note,
        });

        sendJson(res, 201, expense);

        return;
      }

      // GET /expenses
      if (req.method === 'GET' && pathname === '/expenses') {
        const where = {};

        const userId = url.searchParams.get('userId');
        const from = url.searchParams.get('from');
        const to = url.searchParams.get('to');
        const categories = url.searchParams.get('categories');


        if (userId) {
          where.userId = userId;
        }

        if (from || to) {
          where.spentAt = {};

          if (from) {
            where.spentAt[Op.gte] = from;
          }

          if (to) {
            where.spentAt[Op.lte] = to;
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

        sendJson(res, 200, expenses);

        return;
      }

      // Get one expense
      if (req.method === 'GET' && resource === 'expenses' && chosenId) {
        const expense = await Expense.findByPk(chosenId);

        if (!expense) {
          sendJson(res, 404, {
            message: 'Expense not found',
          });

          return;
        }

        sendJson(res, 200, expense);

        return;
      }

      // Update expense
      if (req.method === 'PATCH' && resource === 'expenses' && chosenId) {
        const body = await readBody(req);

        const expense = await Expense.findByPk(chosenId);

        if (!expense) {
          sendJson(res, 404, {
            message: 'Expense not found',
          });

          return;
        }

        if (body.userId !== undefined) {
          const user = await User.findByPk(body.userId);

          if (!user) {
            sendJson(res, 400, {
              message: 'User not found',
            });

            return;
          }
        }

        await expense.update(body);

        sendJson(res, 200, expense);

        return;
      }

      // Delete expense
      if (req.method === 'DELETE' && resource === 'expenses' && chosenId) {
        const expense = await Expense.findByPk(chosenId);

        if (!expense) {
          sendJson(res, 404, {
            message: 'Expense not found',
          });

          return;
        }

        await expense.destroy();

        res.statusCode = 204;
        res.end();

        return;
      }




      sendJson(res, 404, {
        message: 'Not found',
      });
    } catch (error) {
      console.error(error);

      sendJson(res, 500, {
        message: 'Internal server error',
      });
    }
  });

  return server;
};

module.exports = {
  createServer,
};
