//dto untuk products
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductsDto {
    constructor(sku: string, name: string, price: number, qty: number, category: string, pictureUrl: string) {
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.category = category;
        this.pictureUrl = pictureUrl;  
    }

    @IsNotEmpty()
    @IsString()
    sku: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    pictureUrl: string;
}

export class ProductUpdateDto {
    constructor(id: number, sku: string, name: string, price: number, qty: number, category: string, pictureUrl: string) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.category = category;
        this.pictureUrl = pictureUrl;
    }

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    sku: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    qty: number;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    pictureUrl: string;
}

export class ProductGetDto {
    constructor(id: number, sku: string, name: string, price: number, qty: number, category: string, pictureUrl: string) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.qty = qty;
        this.category = category;
        this.pictureUrl = pictureUrl;
    }

    @IsNumber()
    id: number;

    @IsString()
    sku: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    qty: number;

    @IsString()
    category: string;

    @IsString()
    pictureUrl: string;
}
