'use strict';

class UserController {
  constructor(userService) {
    this.service = userService;
  }

  #getId(request) {
    const { id } = request.params;
    const normalizedId = Number(id);

    return Number.isNaN(normalizedId) ? null : normalizedId;
  }

  async getAll(_, response) {
    const users = await this.service.getAll();

    return response.send(users.map(this.service.normalize));
  }

  async getOne(request, response) {
    const id = this.#getId(request);

    if (id === null) {
      return response.sendStatus(400);
    }

    const user = await this.service.getOne(id);

    return user
      ? response.send(this.service.normalize(user))
      : response.sendStatus(404);
  }

  async add(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.sendStatus(400);
    }

    const user = await this.service.add({ name });

    return response
      .status(201)
      .send(this.service.normalize(user));
  }

  async remove(request, response) {
    const id = this.#getId(request);

    if (id === null) {
      return response.sendStatus(400);
    }

    const deletedCount = await this.service.remove(id);

    return deletedCount
      ? response.sendStatus(204)
      : response.sendStatus(404);
  }

  async update(request, response) {
    const id = this.#getId(request);
    const { name } = request.body;

    if (id === null || !name) {
      return response.sendStatus(400);
    }

    try {
      const user = { name, id };
      const updatedUser = await this.service.update(user);

      return response.send(this.service.normalize(updatedUser));
    } catch {
      return response.sendStatus(404);
    }
  }
}

module.exports = UserController;
