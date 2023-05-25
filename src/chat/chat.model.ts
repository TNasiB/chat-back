import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import Message from 'src/message/message.model';
import { User } from 'src/user/user.model';
import { UserChat } from './user-chat.model';

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

  @BelongsToMany(() => User, () => UserChat)
  members: User[];

  @HasMany(() => Message)
  messages: Message[];
}
