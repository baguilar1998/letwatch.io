import { User } from './user';

export class Room {
  _id: string;
  roomName: string;
  host: User;
  currentUsers: User[];
  invitationCode: string;
  password: string;
  maxCapacity: number;
}
