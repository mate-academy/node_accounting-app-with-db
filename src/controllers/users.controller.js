function createUsersController(usersService) {
  return {
    async getAll(req, res) {
      const users = await usersService.getAll();

      res.json(users);
    },

    async getById(req, res) {
      const user = await usersService.getById(+req.params.id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.status(200).json(user);
    },

    async create(req, res) {
      const name = req.body.name;

      if (!name) {
        res.sendStatus(400);

        return;
      }

      const user = await usersService.create(name);

      res.status(201).json(user);
    },

    async remove(req, res) {
      const user = await usersService.deleteById(+req.params.id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.sendStatus(204);
    },

    async update(req, res) {
      const { name } = req.body;
      const user = await usersService.getById(+req.params.id);

      if (!user) {
        return res.sendStatus(404);
      }

      if (!name) {
        res.sendStatus(400);

        return;
      }

      const updatedUser = await usersService.updateById({
        id: +req.params.id,
        name,
      });

      res.json(updatedUser);
    },
  };
}

module.exports = {
  createUsersController,
};
