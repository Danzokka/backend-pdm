import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicationModule } from './medication/medication.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: "akjsdnjaksdnjkawnkjdnaskdkwjdnkawjdnkawdnkawjdnkawndkajdnkawjdnawjkdnkjadnawjkdnwjadnkadnwakjndkajdnakjwdnawkjdn",
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    MedicationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
