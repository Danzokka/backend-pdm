import { Test, TestingModule } from '@nestjs/testing';
import { DependentUserController } from './dependent-user.controller';
import { DependentUserService } from './dependent-user.service';
import { PrismaService } from '../prisma.service';

describe('DependentUserController', () => {
  let controller: DependentUserController;
  let service: DependentUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DependentUserController],
      providers: [DependentUserService, PrismaService],
    }).compile();

    controller = module.get<DependentUserController>(DependentUserController);
    service = module.get<DependentUserService>(DependentUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
