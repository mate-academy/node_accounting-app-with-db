const AbstractService = require('./abstract.service');
const {
  models: { User },
} = require('./../models/models');

class UserService extends AbstractService {
  getModel() {
    return User;
  }

  parseCreateData(body) {
    const errors = [];
    const { name } = body;

    if (!name || name.trim().length === 0) {
      errors.push('Name is required');
    }

    const data = {
      name,
    };

    return {
      errors,
      data,
    };
  }

  parseUpdateData(body) {
    return this.parseCreateData(body);
  }
}

module.exports = new UserService();
