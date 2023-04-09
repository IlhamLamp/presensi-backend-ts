'use strict';

import {
  Model
} from 'sequelize';

interface KehadiranSiswaAttributes {
  id: number;
  siswaId: number;
  status: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class KehadiranSiswa extends Model<KehadiranSiswaAttributes>
  implements KehadiranSiswaAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    siswaId!: number;
    status!: string;

    static associate(models: any) {
      // define association here
      
    }
  }

  KehadiranSiswa.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    siswaId: {
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
    modelName: 'KehadiranSiswa',
    timestamps: false,
    freezeTableName: true
  });
  return KehadiranSiswa;
};