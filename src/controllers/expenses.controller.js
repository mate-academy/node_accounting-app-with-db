'use strict';

const { expensesService } = require('../services/expenses.service');
const { usersService } = require('../services/users.service');

class ExpensesController {
  async get(req, res) {
    try {
      res.status(200).json(await expensesService.get(req.query));
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async create(req, res) {
    const params = req.body;

    const isValidNames = expensesService.isValidParamsFor('create', params);
    const isRequireFields = expensesService.isRequiredParams(params);

    if (!isValidNames || !isRequireFields) {
      return res.sendStatus(400);
    }

    try {
      const user = await usersService.getUserById(params.userId);

      if (!user) {
        return res.sendStatus(400);
      }

      const newEexpense = await expensesService.create(params);

      res.status(201).json(newEexpense);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async getOne(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    try {
      const foundExpense = await expensesService.getOne(id);

      if (!foundExpense) {
        return res.sendStatus(404);
      }

      res.status(200).json(foundExpense);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async remove(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.sendStatus(400);
    }

    try {
      if (!await expensesService.getOne(id)) {
        return res.sendStatus(404);
      }

      await expensesService.remove(id);

      res.sendStatus(204);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async update(req, res) {
    const newParams = req.body;
    const { id } = req.params;

    if (!expensesService.isValidParamsFor('update', newParams) || !id) {
      return res.sendStatus(400);
    }

    try {
      const foundExpense = await expensesService.getOne(id);

      if (!foundExpense) {
        return res.sendStatus(404);
      }

      const updatedExpense = await expensesService.update(
        expensesService.normalize(foundExpense), newParams
      );

      res.status(200).json(updatedExpense);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  }
}

const expensesController = new ExpensesController();

module.exports = {
  expensesController,
};
