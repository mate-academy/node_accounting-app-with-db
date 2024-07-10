module.exports.checkIfEntityExistsByParamId =
  (model) => async (req, res, next) => {
    try {
      const id = +req.params.id;

      const entity = await model.findByPk(id);

      if (!entity) {
        res.status(404).send(`No items were found with the id ${id}`);

        return;
      }

      next();
    } catch (error) {
      res.status(500).send('Internal error');
    }
  };
