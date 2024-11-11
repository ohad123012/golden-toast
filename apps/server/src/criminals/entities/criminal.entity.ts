import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '../../users/entites/user.entities';

@Table
export class Criminal extends Model<Partial<Criminal>> {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataTypes.BOOLEAN })
  isPersonaNonGrata: boolean;
}
