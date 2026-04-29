'use strict';

const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

// Retorna todas as despesas aplicando os filtros recebidos (query params)
async function getAll(filters = {}) {
  const where = {};

  // Filtra por ID de usuário
  if (filters.userId) {
    where.userId = Number(filters.userId);
  }

  // Filtra despesas a partir de uma data inicial (from)
  if (filters.from) {
    where.spentAt = {
      ...where.spentAt,
      [Op.gte]: filters.from, // gte = Greater Than or Equal (Maior ou igual)
    };
  }

  // Filtra despesas até uma data final (to)
  if (filters.to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: filters.to, // lte = Less Than or Equal (Menor ou igual)
    };
  }

  // Filtra por categorias específicas (separadas por vírgula)
  if (filters.categories) {
    const categoryList = filters.categories.split(',');

    where.category = {
      [Op.in]: categoryList, // in = Dentro da lista fornecida
    };
  }

  // Busca todas as despesas que correspondem aos critérios
  return Expense.findAll({ where });
}

// Busca uma despesa específica pelo seu ID
async function getById(id) {
  return Expense.findByPk(id);
}

// Cria uma nova despesa com os dados fornecidos
async function create(data) {
  return Expense.create(data);
}

// Atualiza os dados de uma despesa existente (PATCH)
async function update(id, data) {
  const expense = await getById(id);

  if (!expense) {
    return null;
  }

  // Atualiza as propriedades da despesa
  await expense.update(data);

  return expense;
}

// Remove uma despesa baseada no ID recebido
async function remove(id) {
  const expense = await getById(id);

  if (!expense) {
    return false;
  }

  // Deleta a despesa do banco de dados
  await expense.destroy();

  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
