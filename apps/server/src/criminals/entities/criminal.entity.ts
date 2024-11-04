import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Criminals extends Model<Partial<Criminals>> {}
