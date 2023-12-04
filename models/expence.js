'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const slugify = require("slugify");
module.exports = (sequelize) => {
  class Expence extends Model {
    id;
    userID;
    spentAt;
    title;
    amount;
    category;
    note;

    static associate(models) {
      this.belongsTo(models.User)
    }
  }

  Expence.init({
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Expence',
  });

  Expence.beforeCreate(async (expence, options) => {
    expence.slug = slugify(expence.dataValues.title, { replacement: "-", lower: true });
  });

  Expence.beforeUpdate(async (expence, options) => {
    expence.slug = slugify(expence.dataValues.title, { replacement: "-", lower: true });
  });

  return Expence;
};
