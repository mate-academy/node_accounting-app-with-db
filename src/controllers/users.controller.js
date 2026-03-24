'use strict';

const usersService = require('../services/users.service');

// Controlador para listar todos os usuários
const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users);
};

// Controlador para buscar um usuário específico pelo ID
const getById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Controlador para criar um novo usuário
const create = async (req, res) => {
  const { name } = req.body;

  // Validação: o nome é obrigatório
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = await usersService.create(name);

  // 201 Created
  res.status(201).json(newUser);
};

// Controlador para atualizar os dados de um usuário existente
const update = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.update(id, req.body);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

// Controlador para remover um usuário
const remove = async (req, res) => {
  const id = Number(req.params.id);
  const removed = await usersService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'User not found' });
  }

  // 204 No Content (requisição bem sucedida, sem corpo na resposta)
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
