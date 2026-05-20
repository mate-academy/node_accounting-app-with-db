// middleware/errorHandler.js
const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} = require('sequelize');

function errorHandler(err, req, res, next) {
  // Sequelize: валідація моделі
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Унікальний індекс (дублікат email тощо)
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ message: 'Already exists' });
  }

  // FK: наприклад expense з неіснуючим userId
  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({ message: 'Invalid reference' });
  }

  // Загальна помилка БД (з’єднання, синтаксис SQL, timeout)
  if (err instanceof DatabaseError) {
    return res.status(500).json({ message: 'Database error' });
  }

  // Ваша бізнес-помилка
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal server error' });
}

module.exports = { errorHandler };
