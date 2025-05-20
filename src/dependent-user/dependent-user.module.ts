import { Module } from '@nestjs/common';
import { DependentUserController } from './dependent-user.controller';
import { DependentUserService } from './dependent-user.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [DependentUserController],
  providers: [DependentUserService, PrismaService],
})
export class DependentUserModule {}
