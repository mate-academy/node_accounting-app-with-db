'use strict';

const { Category } = require('../models/Category.model');

// Retorna todas as categorias cadastradas
async function getAll() {
  return Category.findAll();
}

// Busca uma categoria específica pelo seu ID
async function getById(id) {
  return Category.findByPk(id);
}

// Cria uma nova categoria com o nome especificado
async function create(name) {
  return Category.create({ name });
}

// Atualiza os dados (nome) de uma categoria existente
async function update(id, data) {
  const category = await getById(id);

  // Retorna null caso a categoria não seja encontrada
  if (!category) {
    return null;
  }

  // Salva as alterações no banco de dados
  await category.update(data);

  return category;
}

// Remove uma categoria pelo seu ID
async function remove(id) {
  const category = await getById(id);

  if (!category) {
    return false;
  }

  // Deleta o registro definitivamente
  await category.destroy();

  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
