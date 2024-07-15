class AbstractService {
  async getAll() {
    return this.getModel().findAll();
  }

  getById(id) {
    return this.getModel().findByPk(+id);
  }

  create(data) {
    return this.getModel().create(data);
  }

  async deleteOne(id) {
    const entity = await this.getById(id);

    if (entity) {
      await entity.destroy();
    }
  }

  async update(id, data) {
    const entity = await this.getById(id);

    if (!entity) {
      return;
    }

    entity.set(data);
    await entity.save();

    return entity;
  }

  validateDateTimeString(dateTimeString) {
    const dateTimeRegex =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?$/;

    return dateTimeString.match(dateTimeRegex);
  }

  getModel() {
    throw Error('The method getModel must be implemented');
  }

  parseCreateData() {
    throw Error('The method parseCreateData must be implemented');
  }

  parseUpdateData() {
    throw Error('The method parseCreateData must be implemented');
  }
}

module.exports = AbstractService;
