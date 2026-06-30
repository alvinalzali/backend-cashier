import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { TransactionService } from './transaction/transaction.service';
import { TransactionModule } from './transaction/transaction.module';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',  
    }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CartModule,
    TransactionModule,
    FileModule,
    DashboardModule,
    UploadModule],
  controllers: [AppController, FileController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
