import { User } from './user';

export class Room {
  _id: string;
  host: User;
  currentUsers: User[];
  invitationCode: string;
  maxCapacity: number;
}
