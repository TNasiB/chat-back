import { BelongsTo, Column, DataType, Model } from 'sequelize-typescript';
import Chat from 'src/chat/chat.model';

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

  @BelongsTo(() => Chat)
  chatId: Chat;
}
