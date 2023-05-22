import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Chat from '../chat/chat.model';

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @HasMany(() => Chat)
  chats: Chat[];
}
