'use strict';

const {
  allRequiredAttributesEntered, getRequiredAttributes, getAttributes,
} = require('../../utils/attributes');

class ExpenseController {
  constructor(expenseService, userService) {
    const { Expense } = expenseService;

    this.service = expenseService;
    this.userService = userService;
    this.attributes = getAttributes(Expense);

    this.requiredAttributes = getRequiredAttributes(
      Expense, 'id', 'createdAt', 'updatedAt',
    );
  }

  #getId(request) {
    const { id } = request.params;
    const normalizedId = Number(id);

    return Number.isNaN(normalizedId) ? null : normalizedId;
  }

  async getAll(request, response) {
    const { userId, from, to, categories } = request.query;
    const options = {};

    if (userId) {
      options.userId = +userId;
    }

    if (from && to) {
      options.from = new Date(from);
      options.to = new Date(to);
    }

    if (categories && categories.length > 0) {
      options.categories = categories;
    }

    const expenses = await this.service.getAll(options);

    return response.send(expenses.map(this.service.normalize));
  }

  async getOne(request, response) {
    const id = this.#getId(request);
    const expense = await this.service.getOne(id);

    return expense
      ? response.send(this.service.normalize(expense))
      : response.sendStatus(404);
  }

  async add(request, response) {
    const { userId, spentAt, title, amount, category, note } = request.body;
    const requiredAttributesExist = allRequiredAttributesEntered(
      this.requiredAttributes, request.body,
    );

    if (!requiredAttributesExist) {
      return response.sendStatus(400);
    }

    const expenseData = {
      userId,
      spentAt: new Date(spentAt),
      title,
      amount,
      category: category || null,
      note: note || null,
    };

    if (expenseData.userId) {
      const user = await this.userService.getOne(expenseData.userId);

      if (!user) {
        return response.sendStatus(400);
      }
    }

    const expense = await this.service.add(expenseData);
    const preparedExpense = this.service.normalize(expense);

    return response.status(201).send(preparedExpense);
  }

  async remove(request, response) {
    const id = this.#getId(request);
    const deletedCount = await this.service.remove(id);

    return deletedCount
      ? response.sendStatus(204)
      : response.sendStatus(404);
  }

  async update(request, response) {
    const id = this.#getId(request);
    const { userId } = request.body;

    if (userId) {
      const user = await this.userService.getOne(userId);

      if (!user) {
        return response.sendStatus(400);
      }
    }

    try {
      const expense = await this.service.update({ ...request.body, id });

      return response.send(this.service.normalize(expense));
    } catch (error) {
      return response.sendStatus(404);
    }
  }
}

module.exports = ExpenseController;
