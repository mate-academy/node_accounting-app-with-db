'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

// Асоціації без реального FK-обмеження в БД (constraints: false),
// щоб не конфліктувати з TRUNCATE у тестах (Postgres блокує TRUNCATE
// таблиці, на яку є FK-посилання, навіть з ON DELETE CASCADE —
// це обмеження стосується лише DELETE, а не TRUNCATE).
// Каскадне видалення реалізоване вручну через хук нижче.
User.hasMany(Expense, { foreignKey: 'userId', constraints: false });
Expense.belongsTo(User, { foreignKey: 'userId', constraints: false });

// Реальна каскадна поведінка на рівні застосунку:
// видалення User через API автоматично видаляє всі його Expense.
User.addHook('afterDestroy', async (user) => {
  await Expense.destroy({ where: { userId: user.id } });
});

module.exports = {
  models: {
    User,
    Expense,
  },
};
