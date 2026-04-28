const { Expense } = require('../models/Expense.model');
const { expenseFilter } = require('../utils/expenseFilter');

class ExpensesService {
  getByFilter = (filter) => Expense.findAll({ where: expenseFilter(filter) });
  getById = (id) => Expense.findByPk(id);
  create = (expenseData) => Expense.create(expenseData);

  update = async (id, expenseData) => {
    await Expense.update(expenseData, { where: { id } });

    return this.getById(id);
  };

  remove = (id) => Expense.destroy({ where: { id } });
}

module.exports = new ExpensesService();
