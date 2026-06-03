//dto untuk cart
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class AddToCartDto {
    constructor(id: number, userId: number, productId: number, qty: number, totalPrice: number){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.qty = qty;
        this.totalPrice = totalPrice;

    }

    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsOptional()
    @IsNumber()
    totalPrice: number;


}

export class CartUpdateDto {
    constructor(id: number, userId: number, productId: number, qty: number){
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.qty = qty;
    }

    @IsOptional()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    productId: number;

    @IsOptional()
    @IsNumber()
    qty: number;
}

