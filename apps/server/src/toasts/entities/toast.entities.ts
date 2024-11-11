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
import { User } from '../../users/entites/user.entities';
import { ToastParticipants } from '../../toast-participants/entities/toast-participants.entity';

@Table
export class Toast extends Model<Partial<Toast>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => User)
  user: User[];

  @Column({ type: DataTypes.DATE })
  toastDate: Date;

  @Column({ type: DataTypes.STRING })
  reason: string;

  @Column({ type: DataTypes.STRING })
  drinks: string;

  @Column({ type: DataTypes.STRING })
  foods: string;

  @Column({ type: DataTypes.STRING })
  description: string;

  @Column({ type: DataTypes.BOOLEAN })
  hasDone: boolean;

  @HasMany(() => ToastParticipants)
  toastParticipant: ToastParticipants[];
}
