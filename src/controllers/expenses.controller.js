'use strict';

const Expense = require('../models/Expense.model');
const { Op } = require('sequelize');

async function getExpenses(req, res) {
  try {
    const where = {};

    if (req.query.userId) {
      where.userId = req.query.userId;
    }

    if (req.query.startDate && req.query.endDate) {
      where.date = { [Op.between]: [req.query.startDate, req.query.endDate] };
    }

    if (req.query.category) {
      where.category = req.query.category;
    }

    const expenses = await Expense.findAll({ where });

    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).send('Erro ao buscar despesas');
  }
}

async function getExpensesById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Erro na url');
  }

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado');
    }

    return res.status(200).json(expense);
  } catch (err) {
    return res.status(500).send('Erro ao buscar despesa');
  }
}

async function createExpense(req, res) {
  const { title, amount, category, date, userId } = req.body;

  if (!title || amount == null || !date || !userId) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  try {
    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      userId: userId,
    });

    return res.status(201).json(expense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function patchExpensesById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Erro na url');
  }

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado');
    }
    await expense.update(req.body);

    return res.status(200).json(expense);
  } catch (err) {
    return res.status(500).send('Erro ao atualizar');
  }
}

async function deleteExpensesById(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).send('Erro na url');
  }

  try {
    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).send('Não foi encontrado');
    }
    await expense.destroy();

    return res.status(204).send();
  } catch (err) {
    return res.status(500).send('Erro ao deletar despesa');
  }
}

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  patchExpensesById,
  deleteExpensesById,
};
