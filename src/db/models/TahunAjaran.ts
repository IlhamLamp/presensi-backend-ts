import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface TahunAjaranAttributes {
  id?: number,
  TA?: string,

  createdAt?: Date,
  updatedAt?: Date,
}

export interface TahunAjaranInput extends Optional<TahunAjaranAttributes, 'id'> { }
export interface TahunAjaranOutput extends Required<TahunAjaranAttributes> { }

class TahunAjaran extends Model<TahunAjaranAttributes, TahunAjaranInput> implements TahunAjaranAttributes {
  public id!: number;
  public TA!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TahunAjaran.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  TA: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize: connection,
  modelName: 'TahunAjaran',
  timestamps: true,
  freezeTableName: true,
})

export default TahunAjaran;