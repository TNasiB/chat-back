import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import Message from 'src/message/message.model';
import { User } from 'src/user/user.model';

@Table
export default class Chat extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => User)
  members: number[];

  @HasMany(() => Message)
  messages: number[];
}
