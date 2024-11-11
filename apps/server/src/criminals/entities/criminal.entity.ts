import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Users } from '../../users/entites/users.entities';
import { Toasts } from '../../toasts/entities/toasts.entities';

@Table
export class Criminals extends Model<Partial<Criminals>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => Users)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;

  @Column({ type: DataTypes.BOOLEAN })
  isAdmin: boolean;
}
