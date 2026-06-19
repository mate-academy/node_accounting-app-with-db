const { Op } = require('sequelize');

const {
  models: { Expense, User, Category },
} = require('../models/models');

function handleControllerError(res, action, error) {
  // eslint-disable-next-line no-console
  console.error(`Smth bad with: ${action}`, error);
  res.sendStatus(500);
}

function serializeExpense(expense) {
  const plainExpense = expense.get({ plain: true });

  if (plainExpense.Category) {
    plainExpense.category = plainExpense.Category.name;
  }

  delete plainExpense.Category;
  delete plainExpense.categoryId;

  return plainExpense;
}

async function getAllExpenses(req, res) {
  try {
    const { userId, categoryId, categories, from, to } = req.query;

    const where = {};

    if (userId) {
      where.userId = Number(userId);
    }

    if (categoryId) {
      where.categoryId = Number(categoryId);
    }

    if (categories) {
      const category = await Category.findOne({
        where: { name: categories },
      });

      if (!category) {
        return res.send([]);
      }

      where.categoryId = category.id;
    }

    if (from || to) {
      where.spentAt = {};

      if (from) {
        where.spentAt[Op.gte] = new Date(from);
      }

      if (to) {
        where.spentAt[Op.lte] = new Date(to);
      }
    }

    const expenses = await Expense.findAll({
      where,
      include: Category,
      order: [['id', 'ASC']],
    });

    res.send(expenses.map(serializeExpense));
  } catch (error) {
    handleControllerError(res, 'getAllExpenses', error);
  }
}

async function getExpenseById(req, res) {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(Number(id), {
      include: Category,
    });

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(serializeExpense(expense));
  } catch (error) {
    handleControllerError(res, 'getExpenseById', error);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(Number(id));

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    await expense.destroy();

    return res.sendStatus(204);
  } catch (error) {
    handleControllerError(res, 'remove', error);
  }
}

async function create(req, res) {
  try {
    const { userId, spentAt, title, amount, category, categoryId, note } =
      req.body;

    if (userId === undefined || !spentAt || !title || amount === undefined) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const user = await User.findByPk(Number(userId));

    if (!user) {
      return res.sendStatus(400);
    }

    let resolvedCategoryId = categoryId;

    if (category) {
      const [categoryModel] = await Category.findOrCreate({
        where: { name: category },
      });

      resolvedCategoryId = categoryModel.id;
    }

    if (resolvedCategoryId !== undefined) {
      const categoryModel = await Category.findByPk(Number(resolvedCategoryId));

      if (!categoryModel) {
        return res.sendStatus(400);
      }
    }

    const expense = await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      categoryId: resolvedCategoryId,
      note,
    });

    const createdExpense = await Expense.findByPk(expense.id, {
      include: Category,
    });

    res.status(201).send(serializeExpense(createdExpense));
  } catch (error) {
    handleControllerError(res, 'create', error);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, category, categoryId } = req.body;

    const expense = await Expense.findByPk(Number(id), {
      include: Category,
    });

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!title) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    let resolvedCategoryId = categoryId;

    if (category) {
      const [categoryModel] = await Category.findOrCreate({
        where: { name: category },
      });

      resolvedCategoryId = categoryModel.id;
    }

    if (resolvedCategoryId !== undefined) {
      const categoryModel = await Category.findByPk(Number(resolvedCategoryId));

      if (!categoryModel) {
        return res.sendStatus(400);
      }

      expense.categoryId = resolvedCategoryId;
    }

    expense.title = title;
    await expense.save();

    const updatedExpense = await Expense.findByPk(expense.id, {
      include: Category,
    });

    return res.status(200).send(serializeExpense(updatedExpense));
  } catch (error) {
    handleControllerError(res, 'update', error);
  }
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  remove,
  create,
  update,
};
