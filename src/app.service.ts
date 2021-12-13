import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getBoard from './helpers/getBoard';
import { GamingRoom, GamingRoomDocument } from './schemas/gamingRoom.schema';
import { Player, PlayerDocument } from './schemas/player.schema';
import { WaitingRoom, WaitingRoomDocument } from './schemas/waitingRoom.schema';
@Injectable()
export class AppService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(WaitingRoom.name)
    private waitingRoomModel: Model<WaitingRoomDocument>,
    @InjectModel(GamingRoom.name)
    private gamingRoomModel: Model<GamingRoomDocument>,
  ) {}

  getPing(): string {
    return 'Pong!';
  }

  async getOrCreatePlayer(playerId: string): Promise<string> {
    const player = playerId?.length ? await this.findPlayer(playerId) : null;

    if (player) {
      return player.id;
    }

    const newPlayer = await this.createPlayer();

    return newPlayer.id;
  }

  findPlayer(playerId: string): Promise<PlayerDocument> {
    return this.playerModel.findById(playerId).exec();
  }

  createPlayer(): Promise<PlayerDocument> {
    const createdPlayer = new this.playerModel({ gameHistory: '' });

    if (!createdPlayer) {
      throw new InternalServerErrorException();
    }

    return createdPlayer.save();
  }

  async getWaitingRoom(): Promise<WaitingRoomDocument> {
    const [waitingRoom] = await this.waitingRoomModel.find().exec();

    if (!waitingRoom) {
      const createdWaitingRoom = new this.waitingRoomModel({ playersId: '' });

      if (!createdWaitingRoom) {
        throw new InternalServerErrorException();
      }

      return createdWaitingRoom.save();
    }

    return waitingRoom;
  }

  async addUserToWaitingRoom(playerId: string) {
    const waitingRoom = await this.getWaitingRoom();
    const playersId = waitingRoom.playersId
      .split(';')
      .filter((item) => item.length);

    if (!playersId.includes(playerId)) {
      playersId.push(playerId);

      waitingRoom.playersId = playersId.join(';');
      await waitingRoom.save();
    }
  }

  async createGamingRoom(): Promise<GamingRoomDocument> {
    const createdGamingRoom = new this.gamingRoomModel({
      playersId: '',
      board: getBoard(3),
    });

    if (!createdGamingRoom) {
      throw new InternalServerErrorException();
    }

    return createdGamingRoom.save();
  }

  async addPlayersToGamingRoom(): Promise<string> {
    const waitingRoom = await this.getWaitingRoom();
    const playersId = waitingRoom.playersId.split(';');

    if (playersId.length >= 2) {
      const gamingRoom = await this.createGamingRoom();
      gamingRoom.playersId = playersId.slice(0, 2).join(';');
      await gamingRoom.save();
      waitingRoom.playersId = playersId.slice(2).join(';');
      await waitingRoom.save();

      return `${gamingRoom.id}@${gamingRoom.playersId}`;
    }

    return;
  }

  async findGamingRoom(gamingRoomId: string): Promise<GamingRoomDocument> {
    return this.gamingRoomModel.findById(gamingRoomId).exec();
  }

  async addGamingRoomTurn({
    x,
    y,
    playerId,
    gamingRoomId,
  }: {
    x: string;
    y: string;
    playerId: string;
    gamingRoomId: string;
  }): Promise<{ board: string; playersId: string }> {
    const gamingRoom = await this.findGamingRoom(gamingRoomId);
    const board = gamingRoom.board.split(';').filter((item) => item.length);
    const tileNotUsed = board.some((item) => item === `${x}+${y}+playerId`);

    if (!board[board.length - 1].includes(playerId) && tileNotUsed) {
      const updatedBoard = board.filter((item) => !item.includes(`${x}+${y}+`));
      updatedBoard.push(`${x}+${y}+${playerId}`);
      gamingRoom.board = updatedBoard.join(';');
      await gamingRoom.save();
    }

    return { board: gamingRoom.board, playersId: gamingRoom.playersId };
  }
}
