'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task);
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
        },
      },
      organization: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
          user.organization = 'Hacktiv8';
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
