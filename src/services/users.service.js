'use strict';

const { User } = require('../models/User.model');

// Retorna todos os usuários cadastrados no banco de dados
async function getAll() {
  return User.findAll();
}

// Busca um usuário específico pelo seu ID (Primary Key)
async function getById(id) {
  return User.findByPk(id);
}

// Cria um novo usuário com o nome fornecido
async function create(name) {
  return User.create({ name });
}

// Atualiza os dados de um usuário existente
async function update(id, data) {
  const user = await getById(id);

  // Se o usuário não existir, retorna null
  if (!user) {
    return null;
  }

  // Atualiza os campos do usuário com os dados fornecidos
  await user.update(data);

  return user;
}

// Remove um usuário pelo seu ID
async function remove(id) {
  const user = await getById(id);

  // Retorna false se o usuário não for encontrado
  if (!user) {
    return false;
  }

  // Deleta o registro do banco de dados
  await user.destroy();

  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
