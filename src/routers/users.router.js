'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

// Mapeamento das rotas para os respectivos métodos no controlador
// Retorna todos os usuários
router.get('/', usersController.getAll);
// Retorna um usuário específico
router.get('/:id', usersController.getById);
// Cria um novo usuário
router.post('/', usersController.create);
// Atualiza um usuário existente
router.patch('/:id', usersController.update);
// Exclui um usuário
router.delete('/:id', usersController.remove);

module.exports = router;
