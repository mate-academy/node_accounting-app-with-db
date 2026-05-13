function createUsersController(usersService) {
  async function getAll(req, res) {
    const users = await usersService
      .getAll
      // {
      //   order: [['createdAt', 'DESC']],
      // }
      ();

    res.json(users.map(usersService.normalize));
  }

  async function getById(req, res) {
    const { id } = req.params;
    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(usersService.normalize(user));
  }

  async function create(req, res) {
    const { name } = req.body;

    if (typeof name !== 'string' || name.trim() === '') {
      return res.sendStatus(400);
    }

    const user = await usersService.create(name);

    res.status(201).json(user);
  }

  async function update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    if (typeof name !== 'string' || name.trim() === '') {
      return res.sendStatus(400);
    }

    const updatedUser = await usersService.update({ id, name });

    res.json(updatedUser);
  }

  async function remove(req, res) {
    const { id } = req.params;

    const user = await usersService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    await usersService.remove(id);

    res.sendStatus(204);
  }

  return {
    getAll,
    create,
    getById,
    update,
    remove,
  };
}

module.exports = { createUsersController };
// function createUsersController(usersService) {
//   function getAll(req, res) {
//     res.json(usersService.getAll());
//   }

//   function getById(req, res) {
//     const { id } = req.params;

//     const user = usersService.getById(id);

//     if (!user) {
//       return res.sendStatus(404);
//     }

//     res.json(user);
//   }

//   function create(req, res) {
//     const { name } = req.body;

//     if (typeof name !== 'string' || name.trim() === '') {
//       return res.sendStatus(400);
//     }

//     const user = usersService.create(name);

//     res.status(201).json(user);
//   }

//   function update(req, res) {
//     const { id } = req.params;
//     const { name } = req.body;

//     const user = usersService.getById(id);

//     if (!user) {
//       return res.sendStatus(404);
//     }

//     if (typeof name !== 'string' || name.trim() === '') {
//       return res.sendStatus(400);
//     }

//     const updatedUser = usersService.update({ id, name });

//     res.json(updatedUser);
//   }

//   function remove(req, res) {
//     const { id } = req.params;

//     if (!usersService.getById(id)) {
//       return res.sendStatus(404);
//     }

//     usersService.remove(id);

//     res.sendStatus(204);
//   }

//   return {
//     getAll,
//     create,
//     getById,
//     update,
//     remove,
//   };
// }

// module.exports = { createUsersController };
