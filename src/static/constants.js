const { models } = require('../models/models');
const { ent } = require('./vocab');

const tableMap = {
  [ent.usr]: models.User,
  [ent.exp]: models.Expense,
  [ent.cat]: models.Category,
};

const PORT = process.env.PORT || 3000;

module.exports = {
  PORT,
  tableMap,
};
