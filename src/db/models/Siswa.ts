import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

enum JenisKelamin {
  LAKI_LAKI = 'L',
  PEREMPUAN = 'P'
}

interface SiswaAttributes {
  id?: number | null,
  nisn?: string | null,
  nama?: string | null,
  jk?: JenisKelamin | null,
  email?: string | null,
  password?: string | null,
  tahunAjaranId?: number | null,
  kelasId?: number | null,

  createdAt?: Date,
  updatedAt?: Date,
}

export interface SiswaInput extends Optional<SiswaAttributes, 'id'> { }
export interface SiswaOutput extends Required<SiswaAttributes> { }

class Siswa extends Model<SiswaAttributes, SiswaInput> implements SiswaAttributes {
  public id!: number;
  public nisn!: string;
  public nama!: string;
  public jk!: JenisKelamin;
  public email!: string;
  public password!: string;
  public tahunAjaranId!: number;
  public kelasId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date; 

  static associate(models: any) {
    Siswa.belongsTo(models.TahunAjaran, {
      foreignKey: 'tahunAjaranId'
    })

    Siswa.belongsTo(models.Kelas, {
      foreignKey: 'kelasId'
    })
  }
}

Siswa.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nisn: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jk: {
    type: DataTypes.ENUM('L', 'P'),
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
  tahunAjaranId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tahunajaran',
      key: 'id'
    }
  },
  kelasId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'kelas',
      key: 'id'
    }
  },
}, {
  sequelize: connection,
  modelName: 'Siswa',
  timestamps: true,
  freezeTableName: true
})

export default Siswa;
