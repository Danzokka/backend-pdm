import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { PrismaService } from '../prisma.service';

describe('DiseaseController', () => {
  let controller: DiseaseController;
  let service: DiseaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseaseController],
      providers: [DiseaseService, PrismaService],
    }).compile();

    controller = module.get<DiseaseController>(DiseaseController);
    service = module.get<DiseaseService>(DiseaseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
