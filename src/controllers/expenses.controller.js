'use strict';

const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

// Controlador para listar todas as despesas
// (com suporte a filtros via req.query)
const getAll = async (req, res) => {
  const filtered = await expensesService.getAll(req.query);

  res.status(200).json(filtered);
};

// Controlador para buscar uma despesa específica pelo ID
const getById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

// Controlador para cadastrar uma nova despesa
const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;

  // Validação: campos obrigatórios
  if (!userId || !spentAt || !title || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Verifica se o usuário informado realmente existe no banco
  const userExists = await usersService.getById(userId);

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Cria a despesa
  const newExpense = await expensesService.create(req.body);

  res.status(201).json(newExpense);
};

// Controlador para atualizar os dados de uma despesa
const update = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.update(id, req.body);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

// Controlador para remover uma despesa
const remove = async (req, res) => {
  const id = Number(req.params.id);
  const removed = await expensesService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  // Retorna status de sucesso sem conteúdo
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
