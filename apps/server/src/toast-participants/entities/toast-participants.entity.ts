import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Toast } from '../../toasts/entities/toast.entities';
import { User } from '../../users/entites/user.entities';

@Table
export class ToastParticipants extends Model<Partial<ToastParticipants>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => User)
  users: User[];

  @ForeignKey(() => Toast)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  toastId: string;

  @BelongsTo(() => Toast)
  toasts: Toast[];
}
