'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const slugify = require("slugify");

module.exports = (sequelize) => {
  class User extends Model {
    id;
    name;

    static associate(models) {
      this.hasMany(models.Expence)
    }
  }

  User.init({
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    user.slug = slugify(user.dataValues.name, { replacement: "-", lower: true });
  });

  User.beforeUpdate(async (user, options) => {
    user.slug = slugify(user.dataValues.name, { replacement: "-", lower: true });
  });

  return User;
};
