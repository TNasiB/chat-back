import { ForeignKey, Model, Table, Column } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import Chat from './chat.model';

@Table
export class UserChat extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;
}
