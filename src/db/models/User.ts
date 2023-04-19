import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface UserAttributes {
  id?: number,
  uuid?: string | null,
  name?: string | null,
  email?: string | null,
  password?: string | null,
  accessToken?: string | null,
  role?: string | null,

  createdAt?: Date,
  updatedAt?: Date,
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public uuid!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public accessToken!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize: connection,
  modelName: 'User',
  timestamps: true,
  freezeTableName: true
})

export default User;