'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes>
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    uuid!: string;
    name!: string;
    email!: string;
    password!: string;
    role!: string;
    
    static associate(models: any) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true,
          len: [3, 100]
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true,
          isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};