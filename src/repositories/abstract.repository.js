'use strict';

class AbstractRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    return this.model.update(data, { where: { id } });
  }

  async remove(id) {
    return this.model.destroy({ where: { id } });
  }
}

module.exports = AbstractRepository;
