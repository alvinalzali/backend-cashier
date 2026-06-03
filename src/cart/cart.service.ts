import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, CartUpdateDto } from './dto/cart.dto';


@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addToCart(productId: number, addToCartDto: AddToCartDto) {
        const { userId, qty } = addToCartDto;
        productId = Number(productId);

        //cek kalau item sudah ada di keranjang
        const existingItem = await this.prisma.cart.findFirst({
            where: {
                AND : [
                { productId: productId },
                { userId: userId }
                ]
            }
        })
        
        //hitung total price, harga barang diambil dari tabel o
        const product = await this.prisma.products.findUnique({ where: { id: productId } });

        if (!product) {
            throw new Error('Product not found');
        }

        const totalPrice = product.price * qty;

        //tambahkan qty dan update totatPrice
        if (existingItem) {
            const updatedQty = existingItem.qty + qty;
            const updatedTotalPrice = existingItem.totalPrice + totalPrice;
            return this.prisma.cart.update({
                where: { id: existingItem.id },
                data: { qty: updatedQty, totalPrice: updatedTotalPrice }
            });
        }

        return this.prisma.cart.create({
            data: {
                userId,
                productId,
                qty,
                totalPrice
            }
        })
    }



    async getCart(userId: number) {
        userId = Number(userId);
        return this.prisma.cart.findMany({ where: { userId } });
    }

    async updateCart(id: number, CartUpdateDto: CartUpdateDto) {
        const { userId, productId, qty } = CartUpdateDto;
        id = Number(id);

         //cek kalau item sudah ada di keranjang by id cart
        const existingItem = await this.prisma.cart.findUnique({ where: { id } });

        if (!existingItem) {
            throw new Error('Item not found in cart');
        }

        //hitung total price, harga barang diambil dari tabel products, 
        const product = await this.prisma.products.findUnique({ where: { id: existingItem.productId } });

        if (!product) {
            throw new Error('Product not found');
        }

        const totalPrice = product.price * qty;

        return this.prisma.cart.update({
            where: { id },
            data: { qty, totalPrice }
        });
    }


    async deleteItemFromCart(id: number) {
        id = Number(id);
        return this.prisma.cart.delete({ where: { id } });
    }




}
