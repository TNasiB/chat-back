import {
  Column,
  DataType,
  Model,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import Chat from 'src/chat/chat.model';

@Table
export default class Message extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  content: string;

  @ForeignKey(() => Chat)
  chatId: number;
}
