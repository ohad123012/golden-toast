import {
  Table,
  Model,
  PrimaryKey,
  Column,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Toasts } from '../../toasts/entities/toasts.entities';
import { Criminals } from '../../criminals/entities/criminal.entity';
import { ToastParticipants } from '../../toast-participants/entities/toast-participants.entity';

@Table
export class Users extends Model<Partial<Users>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @Column({ type: DataTypes.STRING })
  username: string;

  @Column({ type: DataTypes.STRING })
  password: string;

  @Column({ type: DataTypes.BOOLEAN })
  isAdmin: boolean;

  @HasOne(() => Criminals)
  criminal: Criminals;

  @HasMany(() => Toasts)
  toasts: Toasts[];

  @HasMany(() => ToastParticipants)
  toastParticipant: ToastParticipants[];
}
