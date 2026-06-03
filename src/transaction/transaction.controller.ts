import { Controller, Body, Post, UseGuards, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './dto/transaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private TransactionService: TransactionService) {}

    //buat transaksi
    @Post()
    createTransaction(@Body () transactionDto: TransactionDto) {
        return this.TransactionService.createTransaction(transactionDto);
    }

    //get semua data transaksi
    @Get()
    getAllTransaction() {
        return this.TransactionService.getAllTransaction();
    }

    //get data transaksi berdasarkan id
    @Get(':id')
    getTransactionById(@Param('id') id: number) {
        return this.TransactionService.getTransactionById(id);
    }

}
