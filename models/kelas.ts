'use strict';

import {
  Model
} from 'sequelize';

interface KelasAttributes {
  id: number;
  kodeKelas: string;
  guruId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Kelas extends Model<KelasAttributes>
  implements KelasAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    kodeKelas!: string;
    guruId!: number;

    static associate(models: any) {
      // define association here
      
    }
  }

  Kelas.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    kodeKelas: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    guruId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
  }, {
    sequelize,
    modelName: 'Kelas',
    timestamps: false,
    freezeTableName: true
  });
  return Kelas;
};