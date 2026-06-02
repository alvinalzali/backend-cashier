import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, CartUpdateDto } from './dto/cart.dto';
import { AuthGuard } from '../auth/auth.guard';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addToCart(productId: number, addToCartDto: AddToCartDto) {
        const { id, userId, qty } = addToCartDto;
        productId = Number(productId);

        //cek kalau item sudah ada di keranjang
        const existingItem = await this.prisma.cart.findFirst({
            where: {
                OR : [
                { productId: productId },
                { userId: userId }
                ]
            }
        })

        //tambahkan qty jika sudah ada 
        if (existingItem) {
            existingItem.qty = existingItem.qty + qty;
            return this.prisma.cart.update({ where: { id: existingItem.id }, data: { qty: existingItem.qty } });   
        }
        return this.prisma.cart.create({ data: { id, userId, productId, qty } });
    }

    async getCart(userId: number) {
        userId = Number(userId);
        return this.prisma.cart.findMany({ where: { userId } });
    }

    async updateCart(id: number, CartUpdateDto: CartUpdateDto) {
        const { userId, productId, qty } = CartUpdateDto;
        id = Number(id);
        return this.prisma.cart.update({ where: { id }, data: { userId, productId, qty } });
    }


    async deleteItemFromCart(id: number) {
        id = Number(id);
        return this.prisma.cart.delete({ where: { id } });
    }




}
