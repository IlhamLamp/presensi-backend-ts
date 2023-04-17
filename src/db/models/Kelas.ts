import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface KelasAttributes {
  id?: number;
  kodeKelas?: string;
  guruId?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface KelasInput extends Optional<KelasAttributes, 'id'>{ }
export interface KelasOutput extends Required<KelasAttributes> { }

class Kelas extends Model<KelasAttributes, KelasInput> implements KelasAttributes {
  public id!: number;
  public kodeKelas!: string;
  public guruId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
} 

Kelas.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  kodeKelas: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  sequelize: connection,
  modelName: 'Kelas',
  timestamps: true,
  freezeTableName: true
})

export default Kelas;