class AbstractController {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res) {
    res.json(await this.service.getAll(req.query));
  }

  async getOne(req, res) {
    const id = req.params.id;
    const entity = await this.service.getById(id);

    if (!entity) {
      return res.sendStatus(404);
    }

    res.json(entity);
  }

  async create(req, res) {
    const { errors, data } = this.service.parseCreateData(req.body);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    res.status(201).json(await this.service.create(data));
  }

  async deleteOne(req, res) {
    const id = req.params.id;
    const entity = await this.service.getById(id);

    if (!entity) {
      return res.sendStatus(404);
    }

    this.service.deleteOne(req.params.id);

    res.sendStatus(204);
  }

  async update(req, res) {
    const entity = await this.service.getById(req.params.id);

    if (!entity) {
      return res.sendStatus(404);
    }

    const { errors, data } = this.service.parseUpdateData(req.body);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    res.json(await this.service.update(req.params.id, data));
  }
}

module.exports = AbstractController;
