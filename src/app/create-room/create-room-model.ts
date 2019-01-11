export class Room {
    constructor(
    public id: number,
    public playlistId: number,
    public nickName: string,
    public roomName: string,
    public macCapacity : 10,
    public password?: string,
    public userId?: number,

  ) { }
}