import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

export const getAll = () => {
  return User.findAll();
};

export const getById = (id) => {
  return User.findByPk(id);
};

export const create = (name) => {
  return User.create({ name });
};

export const update = (id, name) => {
  return User.update({ name }, { where: { id } });
};

export const remove = (id) => {
  return User.destroy({ where: { id } });
};
