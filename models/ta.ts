'use strict';

import {
  Model
} from 'sequelize';

interface TahunAjaranAttributes {
  id: number;
  TA: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class TahunAjaran extends Model<TahunAjaranAttributes>
  implements TahunAjaranAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    TA!: string;

    static associate(models: any) {
      // define association here
      
    }
  }

  TahunAjaran.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    TA: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
  }, {
    sequelize,
    modelName: 'TahunAjaran',
    timestamps: false,
    freezeTableName: true
  });
  return TahunAjaran;
};