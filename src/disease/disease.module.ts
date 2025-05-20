import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [DiseaseController],
  providers: [DiseaseService, PrismaService],
})
export class DiseaseModule {}
