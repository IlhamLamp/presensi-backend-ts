'use strict';

import {
  Model
} from 'sequelize';

interface GuruAttributes {
  id: number;
  nuptk: string;
  nama: string;
  jk: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Guru extends Model<GuruAttributes>
  implements GuruAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nuptk!: string;
    nama!: string;
    jk!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      
    }
  }

  Guru.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nuptk: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jk: {
        type: DataTypes.ENUM('L', 'P'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
  }, {
    sequelize,
    modelName: 'Guru',
    freezeTableName: true
  });
  return Guru;
};