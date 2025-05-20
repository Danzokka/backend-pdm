import { Test, TestingModule } from '@nestjs/testing';
import { DependentUserService } from './dependent-user.service';
import { PrismaService } from '../prisma.service';

describe('DependentUserService', () => {
  let service: DependentUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DependentUserService, PrismaService],
    }).compile();

    service = module.get<DependentUserService>(DependentUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
