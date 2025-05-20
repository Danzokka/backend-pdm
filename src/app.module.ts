import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicationModule } from './medication/medication.module';
import { AuthModule } from './auth/auth.module';
import { DiseaseModule } from './disease/disease.module';
import { DependentUserModule } from './dependent-user/dependent-user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    MedicationModule,
    AuthModule,
    DiseaseModule,
    DependentUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
