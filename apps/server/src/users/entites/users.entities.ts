import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Users extends Model<Partial<Users>> {}
