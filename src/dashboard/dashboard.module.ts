import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { AuthGuard } from '../auth/auth.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [DashboardService, AuthGuard],
  controllers: [DashboardController],
  imports: [PrismaModule]
})
export class DashboardModule {}
