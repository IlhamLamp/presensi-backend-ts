import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

enum JenisKelamin {
  LAKI_LAKI = 'L',
  PEREMPUAN = 'P'
}

interface GuruAttributes {
  id?: number,
  nuptk?: string | null,
  nama?: string | null,
  jk?: JenisKelamin | null,
  email?: string | null,
  password?: string | null,

  createdAt?: Date,
  updatedAt?: Date,
}

export interface GuruInput extends Optional<GuruAttributes, 'id'> { }
export interface GuruOutput extends Required<GuruAttributes> { }

class Guru extends Model<GuruAttributes, GuruInput> implements GuruAttributes {
  public id!: number;
  public nuptk!: string;
  public nama!: string;
  public jk!: JenisKelamin;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Guru.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nuptk: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jk: {
    type: DataTypes.ENUM('L','P'),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: connection,
  modelName: 'Guru',
  timestamps: true,
  freezeTableName: true
})

export default Guru;