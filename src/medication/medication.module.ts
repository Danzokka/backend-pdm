import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [MedicationController],
  providers: [MedicationService, PrismaService],
})
export class MedicationModule {}
