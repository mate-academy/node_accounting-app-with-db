'use strict';

const express = require('express');
const expensesController = require('../controllers/expenses.controller');

const router = express.Router();

// Mapeamento das rotas de despesas para o controlador
// Retorna todas as despesas (com filtros via query)
router.get('/', expensesController.getAll);
// Retorna uma despesa específica
router.get('/:id', expensesController.getById);
// Cria uma nova despesa
router.post('/', expensesController.create);
// Edita uma despesa
router.patch('/:id', expensesController.update);
// Deleta uma despesa
router.delete('/:id', expensesController.remove);

module.exports = router;
