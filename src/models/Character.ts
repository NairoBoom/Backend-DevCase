import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Character extends Model {
  public id!: number;
  public name!: string;
  public status!: string;
  public species!: string;
  public gender!: string;
  public origin!: string;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'characters',
    underscored: true,
    timestamps: true
  }
);

export default Character;
