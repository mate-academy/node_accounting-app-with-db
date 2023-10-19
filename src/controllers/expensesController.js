'use strict';

const {
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  getFilteredExpenses,
  getAll,
} = require('../services/expensesService');
const {
  NOT_EXIST_CODE,
  INVALID_PARAMETERS_CODE,
  SUCCESSFUL_DELETION_CODE,
  SUCCESSFUL_CREATION_CODE,
  SERVER_SIDE_ERROR_CODE,
} = require('../utils/constants');
const { validateId } = require('../utils/validateId');
const { getUserById } = require('../services/usersService');
const { prepareIdFromReqUrl } = require('../utils/prepareIdFromReqUrl');
const {
  validateExpenseDataToPost,
} = require('../utils/validateExpenseDataToPost');

async function get(req, res) {
  const query = req.query;

  if (!Object.keys(query).length) {
    try {
      const expensesAll = await getAll();

      res.send(expensesAll);

      return;
    } catch (err) {
      res.sendStatus(SERVER_SIDE_ERROR_CODE);
    }
  }

  const userId = +query.userId;
  const user = query.userId ? await getUserById(userId) : true;

  if (!user) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  try {
    const expenses = await getFilteredExpenses(
      {
        ...query,
        userId,
      },
    );

    res.send(expenses);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
  }
}

async function getOne(req, res) {
  const id = prepareIdFromReqUrl(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  try {
    const expense = await getExpenseById(id);

    if (!expense) {
      res.sendStatus(NOT_EXIST_CODE);

      return;
    }

    res.send(expense);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
  }
}

async function post(req, res) {
  const dataToPost = req.body;
  const isUserExist = await getUserById(dataToPost.userId);
  const isValidData = validateExpenseDataToPost(dataToPost);

  if (
    !isUserExist
    || !isValidData
  ) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  try {
    const createdExpense = await createExpense(dataToPost);

    res
      .status(SUCCESSFUL_CREATION_CODE)
      .send(createdExpense);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
  }
}

async function remove(req, res) {
  const id = prepareIdFromReqUrl(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  try {
    await deleteExpense(id);
    res.sendStatus(SUCCESSFUL_DELETION_CODE);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
  }
}

async function patch(req, res) {
  const id = prepareIdFromReqUrl(req);

  const dataToUpdate = {
    ...req.body,
    id,
  };

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expense = await getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  try {
    const updatedExpense = await updateExpense(dataToUpdate);

    res.send(updatedExpense);
  } catch (err) {
    res.sendStatus(SERVER_SIDE_ERROR_CODE);
  }
}

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
