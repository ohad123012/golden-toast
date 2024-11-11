import {
  Table,
  Model,
  PrimaryKey,
  Column,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Toast } from '../../toasts/entities/toast.entities';
import { Criminal } from '../../criminals/entities/criminal.entity';
import { ToastParticipants } from '../../toast-participants/entities/toast-participants.entity';

@Table
export class User extends Model<Partial<User>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @Column({ type: DataTypes.STRING })
  username: string;

  @Column({ type: DataTypes.STRING })
  password: string;

  @Column({ type: DataTypes.BOOLEAN })
  isAdmin: boolean;

  @HasOne(() => Criminal)
  criminal: Criminal;

  @HasMany(() => Toast)
  toasts: Toast[];

  @HasMany(() => ToastParticipants)
  toastParticipant: ToastParticipants[];
}
