'use strict';
/*eslint-disable*/

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var http = require('http');

var _require = require('sequelize'),
    Op = _require.Op;

var _require2 = require('./models/User.model'),
    User = _require2.User;

var _require3 = require('./models/Expense.model'),
    Expense = _require3.Expense;

var readBody = function readBody(req) {
  return new Promise(function (resolve, reject) {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk.toString();
    });
    req.on('end', function () {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

var sendJson = function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};

var createServer = function createServer() {
  var server = http.createServer(function _callee(req, res) {
    var url, pathname, _pathname$split, _pathname$split2, resource, chosenId, body, user, users, _user, _body, _user2, _user3, _body2, spentAt, title, amount, userId, category, note, _user4, expense, where, _userId, from, to, categories, expenses, _expense, _body3, _expense2, _user5, _expense3;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = new URL(req.url, "http://".concat(req.headers.host));
            pathname = url.pathname;
            _pathname$split = pathname.split('/'), _pathname$split2 = _slicedToArray(_pathname$split, 3), resource = _pathname$split2[1], chosenId = _pathname$split2[2];
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (!(req.method === 'OPTIONS')) {
              _context.next = 10;
              break;
            }

            res.statusCode = 204;
            res.end();
            return _context.abrupt("return");

          case 10:
            _context.prev = 10;

            if (!(req.method === 'POST' && pathname === '/users')) {
              _context.next = 23;
              break;
            }

            _context.next = 14;
            return regeneratorRuntime.awrap(readBody(req));

          case 14:
            body = _context.sent;

            if (body.name) {
              _context.next = 18;
              break;
            }

            sendJson(res, 400, {
              message: 'Name is required'
            });
            return _context.abrupt("return");

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(User.create({
              name: body.name
            }));

          case 20:
            user = _context.sent;
            sendJson(res, 201, user);
            return _context.abrupt("return");

          case 23:
            if (!(req.method === 'GET' && pathname === '/users')) {
              _context.next = 29;
              break;
            }

            _context.next = 26;
            return regeneratorRuntime.awrap(User.findAll());

          case 26:
            users = _context.sent;
            sendJson(res, 200, users);
            return _context.abrupt("return");

          case 29:
            if (!(req.method === 'GET' && resource === 'users' && chosenId)) {
              _context.next = 38;
              break;
            }

            _context.next = 32;
            return regeneratorRuntime.awrap(User.findByPk(chosenId));

          case 32:
            _user = _context.sent;

            if (_user) {
              _context.next = 36;
              break;
            }

            sendJson(res, 404, {
              message: 'User not found'
            });
            return _context.abrupt("return");

          case 36:
            sendJson(res, 200, _user);
            return _context.abrupt("return");

          case 38:
            if (!(req.method === 'PATCH' && resource === 'users' && chosenId)) {
              _context.next = 55;
              break;
            }

            _context.next = 41;
            return regeneratorRuntime.awrap(readBody(req));

          case 41:
            _body = _context.sent;
            _context.next = 44;
            return regeneratorRuntime.awrap(User.findByPk(chosenId));

          case 44:
            _user2 = _context.sent;

            if (_user2) {
              _context.next = 48;
              break;
            }

            sendJson(res, 404, {
              message: 'User not found'
            });
            return _context.abrupt("return");

          case 48:
            if (_body.name) {
              _context.next = 51;
              break;
            }

            sendJson(res, 400, {
              message: 'Name is required'
            });
            return _context.abrupt("return");

          case 51:
            _context.next = 53;
            return regeneratorRuntime.awrap(_user2.update({
              name: _body.name
            }));

          case 53:
            sendJson(res, 200, _user2);
            return _context.abrupt("return");

          case 55:
            if (!(req.method === 'DELETE' && resource === 'users' && chosenId)) {
              _context.next = 67;
              break;
            }

            _context.next = 58;
            return regeneratorRuntime.awrap(User.findByPk(chosenId));

          case 58:
            _user3 = _context.sent;

            if (_user3) {
              _context.next = 62;
              break;
            }

            sendJson(res, 404, {
              message: 'User not found'
            });
            return _context.abrupt("return");

          case 62:
            _context.next = 64;
            return regeneratorRuntime.awrap(_user3.destroy());

          case 64:
            res.statusCode = 204;
            res.end();
            return _context.abrupt("return");

          case 67:
            if (!(req.method === 'POST' && pathname === '/expenses')) {
              _context.next = 86;
              break;
            }

            _context.next = 70;
            return regeneratorRuntime.awrap(readBody(req));

          case 70:
            _body2 = _context.sent;
            spentAt = _body2.spentAt, title = _body2.title, amount = _body2.amount, userId = _body2.userId, category = _body2.category, note = _body2.note;

            if (!(!spentAt || !title || amount === undefined || !userId)) {
              _context.next = 75;
              break;
            }

            sendJson(res, 400, {
              message: 'spentAt, title, amount and userId are required'
            });
            return _context.abrupt("return");

          case 75:
            _context.next = 77;
            return regeneratorRuntime.awrap(User.findByPk(userId));

          case 77:
            _user4 = _context.sent;

            if (_user4) {
              _context.next = 81;
              break;
            }

            sendJson(res, 400, {
              message: 'User not found'
            });
            return _context.abrupt("return");

          case 81:
            _context.next = 83;
            return regeneratorRuntime.awrap(Expense.create({
              spentAt: spentAt,
              title: title,
              amount: amount,
              userId: userId,
              category: category,
              note: note
            }));

          case 83:
            expense = _context.sent;
            sendJson(res, 201, expense);
            return _context.abrupt("return");

          case 86:
            if (!(req.method === 'GET' && pathname === '/expenses')) {
              _context.next = 100;
              break;
            }

            where = {};
            _userId = url.searchParams.get('userId');
            from = url.searchParams.get('from');
            to = url.searchParams.get('to');
            categories = url.searchParams.get('categories');

            if (_userId) {
              where.userId = _userId;
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
              where.category = _defineProperty({}, Op["in"], categories.split(','));
            }

            _context.next = 97;
            return regeneratorRuntime.awrap(Expense.findAll({
              where: where
            }));

          case 97:
            expenses = _context.sent;
            sendJson(res, 200, expenses);
            return _context.abrupt("return");

          case 100:
            if (!(req.method === 'GET' && resource === 'expenses' && chosenId)) {
              _context.next = 109;
              break;
            }

            _context.next = 103;
            return regeneratorRuntime.awrap(Expense.findByPk(chosenId));

          case 103:
            _expense = _context.sent;

            if (_expense) {
              _context.next = 107;
              break;
            }

            sendJson(res, 404, {
              message: 'Expense not found'
            });
            return _context.abrupt("return");

          case 107:
            sendJson(res, 200, _expense);
            return _context.abrupt("return");

          case 109:
            if (!(req.method === 'PATCH' && resource === 'expenses' && chosenId)) {
              _context.next = 130;
              break;
            }

            _context.next = 112;
            return regeneratorRuntime.awrap(readBody(req));

          case 112:
            _body3 = _context.sent;
            _context.next = 115;
            return regeneratorRuntime.awrap(Expense.findByPk(chosenId));

          case 115:
            _expense2 = _context.sent;

            if (_expense2) {
              _context.next = 119;
              break;
            }

            sendJson(res, 404, {
              message: 'Expense not found'
            });
            return _context.abrupt("return");

          case 119:
            if (!(_body3.userId !== undefined)) {
              _context.next = 126;
              break;
            }

            _context.next = 122;
            return regeneratorRuntime.awrap(User.findByPk(_body3.userId));

          case 122:
            _user5 = _context.sent;

            if (_user5) {
              _context.next = 126;
              break;
            }

            sendJson(res, 400, {
              message: 'User not found'
            });
            return _context.abrupt("return");

          case 126:
            _context.next = 128;
            return regeneratorRuntime.awrap(_expense2.update(_body3));

          case 128:
            sendJson(res, 200, _expense2);
            return _context.abrupt("return");

          case 130:
            if (!(req.method === 'DELETE' && resource === 'expenses' && chosenId)) {
              _context.next = 142;
              break;
            }

            _context.next = 133;
            return regeneratorRuntime.awrap(Expense.findByPk(chosenId));

          case 133:
            _expense3 = _context.sent;

            if (_expense3) {
              _context.next = 137;
              break;
            }

            sendJson(res, 404, {
              message: 'Expense not found'
            });
            return _context.abrupt("return");

          case 137:
            _context.next = 139;
            return regeneratorRuntime.awrap(_expense3.destroy());

          case 139:
            res.statusCode = 204;
            res.end();
            return _context.abrupt("return");

          case 142:
            sendJson(res, 404, {
              message: 'Not found'
            });
            _context.next = 149;
            break;

          case 145:
            _context.prev = 145;
            _context.t0 = _context["catch"](10);
            console.error(_context.t0);
            sendJson(res, 500, {
              message: 'Internal server error'
            });

          case 149:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[10, 145]]);
  });
  return server;
};

module.exports = {
  createServer: createServer
};