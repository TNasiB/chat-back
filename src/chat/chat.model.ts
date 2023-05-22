import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  HasMany,
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: [],
  })
  @BelongsTo(() => User)
  members: User[];

  @HasMany(() => Message)
  messages: Message[];
}
