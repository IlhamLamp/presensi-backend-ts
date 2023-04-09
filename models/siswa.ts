'use strict';

import {
  Model
} from 'sequelize';

interface SiswaAttributes {
  id: number;
  nisn: string;
  nama: string;
  jk: string;
  email: string;
  password: string;
  tahunAjaranId: number;
  kelasId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Siswa extends Model<SiswaAttributes>
  implements SiswaAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nisn!: string;
    nama!: string;
    jk!: string;
    email!: string;
    password!: string;
    tahunAjaranId!: number;
    kelasId!: number;

    static associate(models: any) {
      // define association here
      
    }
  }
  Siswa.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nisn: {
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
    tahunAjaranId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    kelasId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        // references: {
        //     model: 'kelas',
        //     key: 'id'
        // }
    }
  }, {
    sequelize,
    modelName: 'Siswa',
    freezeTableName: true
  });

  return Siswa;
};