import { User } from './user';

export class Room {
  roomName: string;
  host: User;
  currentUsers: User[];
  invitationCode: string;
  password: string;
  maxCapacity: number;
}
