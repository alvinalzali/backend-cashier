import { Injectable } from '@nestjs/common';
import { TransactionDto, TransactionDetailsDto  } from './dto/transaction.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}


    //masukan data transaksi dari frontend bedasarkan id user beserta detail transaction
    async createTransaction(transactionDto: TransactionDto) {
        const moneyChanged = transactionDto.moneyPayed - transactionDto.totalPrice;
        
        const transaction = await this.prisma.transactions.create({
            data: {
            userId: transactionDto.userId,
            moneyPayed: transactionDto.moneyPayed,
            moneyChanged: moneyChanged,
            totalPrice: transactionDto.totalPrice,
            details: {
                create: transactionDto.details.map((item) => ({
                        productId: item.productId,
                        qty: item.qty,
                        price: item.price,
                    })),
                },
            },
        });

        //hapus cart setelah transaksi berdasarkan user id dan product id
        for (const item of transactionDto.details) {
            await this.prisma.cart.deleteMany({ 
                where: { 
                    AND: [
                        { userId: transactionDto.userId },
                        { productId: item.productId },
                    ]
                }
            });
        }

        //update qty setelah transaksi pada tabel products
        for (const item of transactionDto.details) {
            await this.prisma.products.update({
                where: { id: item.productId },
                data: { qty: { decrement: item.qty } },
            });
        }

        return transaction;
    }

    //ambil transaksi berdasarkan id transaksi
    async getTransactionById(id: number) {
        const transactionById = await this.prisma.transactions.findUnique({ where: { id }, include: { details: true } });
        return transactionById;
    }

    async getAllTransaction() {
        return await this.prisma.transactions.findMany({ include: { details: true } });
    }

}
