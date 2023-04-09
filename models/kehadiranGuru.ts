'use strict';

import {
  Model
} from 'sequelize';

interface KehadiranGuruAttributes {
  id: number;
  guruId: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class KehadiranGuru extends Model<KehadiranGuruAttributes>
  implements KehadiranGuruAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    guruId!: number;
    status!: string;

    static associate(models: any) {
      // define association here
      
    }
  }

  KehadiranGuru.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    guruId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.ENUM('belum hadir', 'hadir'),
        defaultValue: 'belum hadir',
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'KehadiranGuru',
    freezeTableName: true
  });
  return KehadiranGuru;
};