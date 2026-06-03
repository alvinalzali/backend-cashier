import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, AuthGuard],
  imports: [PrismaModule, JwtModule],

})
export class TransactionModule {}
