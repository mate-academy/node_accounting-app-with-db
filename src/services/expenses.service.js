const { Op } = require('sequelize');
const AbstractService = require('./abstract.service');
const UserService = require('./users.service');
const {
  models: { Expense },
} = require('./../models/models');

class ExpensesService extends AbstractService {
  constructor(userService) {
    super();

    this.userService = userService;
  }

  getAll(query) {
    const criteria = {};
    let fromDate, toDate;

    if (query.from && this.validateDateTimeString(query.from)) {
      fromDate = new Date(query.from).getTime();
    }

    if (query.to && this.validateDateTimeString(query.to)) {
      toDate = new Date(query.to).getTime();
    }

    if (query.userId) {
      criteria.userId = +query.userId;
    }

    if (fromDate && toDate) {
      criteria.spentAt = {
        [Op.between]: [fromDate, toDate],
      };
    } else if (fromDate || toDate) {
      if (fromDate) {
        criteria.spentAt = {
          [Op.gte]: [fromDate, toDate],
        };
      }

      if (toDate) {
        criteria.spentAt = {
          [Op.lte]: [fromDate, toDate],
        };
      }
    }

    if (query.categories) {
      criteria.category = {
        [Op.eq]: query.categories,
      };
    }

    return this.getModel().findAll({ where: criteria });
  }

  parseCreateData(body) {
    const errors = [];
    const { userId, spentAt, title, amount, category, note = '' } = body;

    if (!userId || !spentAt || !title || !amount) {
      errors.push('Some of the fields are absent');
    }

    if (spentAt && !this.validateDateTimeString(spentAt)) {
      errors.push('Wrong Spent date/time format');
    }

    if (amount && isNaN(parseInt(amount))) {
      errors.push('The amount must be a number');
    }

    const user = this.userService.getById(userId ?? 0);

    if (!user) {
      errors.push('User not found');
    }

    let data = {};

    if (errors.length > 0) {
      return {
        errors,
        data,
      };
    }

    data = Object.assign(data, {
      userId,
      title,
      category,
      note,
      amount: parseInt(amount),
      spentAt: new Date(spentAt),
    });

    return {
      errors,
      data,
    };
  }

  parseUpdateData(body) {
    const errors = [];

    let spentAt = body.spentAt || null;
    const title = body.title || null;
    const amount = body.amount || null;
    const category = body.category || null;
    const note = body.note || null;

    if (spentAt && !this.validateDateTimeString(spentAt)) {
      errors.push('Wrong Spent date time format');
    } else if (spentAt) {
      spentAt = new Date(spentAt);
    }

    let data = {};

    if (spentAt) {
      data = Object.assign(data, { spentAt });
    }

    if (title) {
      data = Object.assign(data, { title });
    }

    if (amount) {
      data = Object.assign(data, { amount });
    }

    if (category) {
      data = Object.assign(data, { category });
    }

    if (note) {
      data = Object.assign(data, { note });
    }

    return {
      errors,
      data,
    };
  }

  getModel() {
    return Expense;
  }
}

module.exports = new ExpensesService(UserService);
