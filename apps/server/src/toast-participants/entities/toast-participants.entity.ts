import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Toasts } from '../../toasts/entities/toasts.entities';
import { Users } from '../../users/entites/users.entities';

@Table
export class ToastParticipants extends Model<Partial<ToastParticipants>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => Users)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => Users)
  users: Users[];

  @ForeignKey(() => Toasts)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  toastId: string;

  @BelongsTo(() => Toasts)
  toasts: Toasts[];
}
