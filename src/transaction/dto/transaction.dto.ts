import { IsArray, IsNotEmpty, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionDetailsDto {
    constructor( productId: number, qty: number, price: number) {
        this.productId = productId;
        this.qty = qty;
        this.price = price;
    }


    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}

// 2. DTO Utama (Induk Transaksi)
export class TransactionDto {
    constructor (id: number, userId: number, moneyPayed: number, moneyChanged: number, totalPrice: number, details: TransactionDetailsDto[]) {
        this.id = id;
        this.userId = userId;
        this.moneyPayed = moneyPayed;
        this.moneyChanged = moneyChanged;
        this.totalPrice = totalPrice;
        this.details = details;
    }

    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    moneyPayed: number;

    @IsNotEmpty()
    @IsNumber()
    moneyChanged: number;

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TransactionDetailsDto)
    details: TransactionDetailsDto[];
}