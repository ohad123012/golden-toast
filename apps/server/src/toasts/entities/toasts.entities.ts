import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Toasts extends Model<Partial<Toasts>> {}
