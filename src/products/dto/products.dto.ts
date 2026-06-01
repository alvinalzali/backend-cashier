//dto untuk products
import { IsNotEmpty, IsOptional } from "class-validator";

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
    sku: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    qty: number;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
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
    id: number;

    @IsOptional()
    sku: string;

    @IsOptional()
    name: string;

    @IsOptional()
    price: number;

    @IsOptional()
    qty: number;

    @IsOptional()
    category: string;

    @IsOptional()
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
    id: number;
    sku: string;
    name: string;
    price: number;
    qty: number;
    category: string;
    pictureUrl: string;
}
