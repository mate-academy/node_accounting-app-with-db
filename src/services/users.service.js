import { sequelize } from '../db.js';
import { DataTypes } from 'sequelize';

const Users = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

export const getAll = async () => {
  return await Users.findAll();
};

export const getById = async (id) => {
  return Users.findByPk(id);
};

export const create = (name) => {
  return Users.create({ name });
};

export const update = async ({ id, name }) => {
  await Users.update({ name }, { where: { id } });
};

export const remove = (id) => {
  Users.destroy({where: {id}})
};
