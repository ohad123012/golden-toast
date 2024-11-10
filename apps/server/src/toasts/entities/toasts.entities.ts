import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Users } from '../../users/entites/users.entities';
import { ToastParticipants } from '../../toast-participants/entities/toast-participants.entity';

@Table
export class Toasts extends Model<Partial<Toasts>> {
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => Users)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => Users)
  user: Users[];

  @Column({ type: DataTypes.STRING })
  reasonForToast: string;

  @Column({ type: DataTypes.STRING })
  drinks: string;

  @Column({ type: DataTypes.STRING })
  foods: string;

  @Column({ type: DataTypes.STRING })
  description: string;

  @HasMany(() => ToastParticipants)
  toastParticipant: ToastParticipants[];
}
