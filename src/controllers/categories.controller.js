'use strict';

const categoriesService = require('../services/categories.service');

// Controlador para listar todas as categorias disponíveis
const getAll = async (req, res) => {
  const categories = await categoriesService.getAll();

  res.status(200).json(categories);
};

// Controlador para buscar os detalhes de uma categoria específica pelo ID
const getById = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoriesService.getById(id);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json(category);
};

// Controlador para criar uma nova categoria
const create = async (req, res) => {
  const { name } = req.body;

  // Validação básica: nome não pode ser vazio
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newCategory = await categoriesService.create(name);

  // 201 Created indica que o recurso foi criado com sucesso
  res.status(201).json(newCategory);
};

// Controlador para atualizar o nome de uma categoria existente
const update = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoriesService.update(id, req.body);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.status(200).json(category);
};

// Controlador para excluir uma categoria
const remove = async (req, res) => {
  const id = Number(req.params.id);
  const removed = await categoriesService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'Category not found' });
  }

  // 204 No Content indica sucesso na exclusão
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
