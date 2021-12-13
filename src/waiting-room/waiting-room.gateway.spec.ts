import { Test, TestingModule } from '@nestjs/testing';
import { WaitingRoomGateway } from './waiting-room.gateway';
import { WaitingRoomService } from './waiting-room.service';

describe('WaitingRoomGateway', () => {
  let gateway: WaitingRoomGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitingRoomGateway, WaitingRoomService],
    }).compile();

    gateway = module.get<WaitingRoomGateway>(WaitingRoomGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
