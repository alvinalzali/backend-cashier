import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [CartController],
  providers: [CartService, AuthGuard, ProductsService],
  imports: [PrismaModule, JwtModule],
  exports: [CartService],
})
export class CartModule {}
