import { Controller, Get, Patch, Delete, Post, UseGuards, Param, Body} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AddToCartDto, CartUpdateDto } from './dto/cart.dto';
import { CartService } from './cart.service';

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post(':productId')
    addToCart(@Param('productId') productId: number, @Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(productId, addToCartDto);
    }

    @Get(':userId')
    getCart(@Param('userId') userId: number) {
        return this.cartService.getCart(userId);
    }

    @Delete(':id')
    deleteItemFromCart(@Param('id') id: number) {
        return this.cartService.deleteItemFromCart(id);
    }

    @Patch(':id')
    updateCart(@Param('id') id: number, @Body() CartUpdateDto: CartUpdateDto) {
        return this.cartService.updateCart(id, CartUpdateDto);
    }

}
