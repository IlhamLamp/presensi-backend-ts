import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

enum JenisKelamin {
  LAKI_LAKI = 'L',
  PEREMPUAN = 'P'
}

interface SiswaAttributes {
  id?: number,
  nisn?: string,
  nama?: string,
  jk?: JenisKelamin,
  email?: string,
  password?: string,
  tahunAjaranId?: number,
  kelasId?: number,

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
    },
    references: {
      model: 'tahunajaran',
      key: 'id'
    }
  },
  kelasId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
