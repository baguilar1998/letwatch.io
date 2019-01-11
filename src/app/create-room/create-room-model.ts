export class Room {
    constructor(
    public id: number,
    public playlistId: number,
    public nickName: string,
    public roomName: string,
    public password?: string,
    public userId?: number,
  ) { }
}