import { Injectable, ConflictException } from '@nestjs/common';
import { ProductsDto, ProductUpdateDto } from './dto/products.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}
    async create(createProductsDto: ProductsDto) {
        const {sku, name, price, qty, category, pictureUrl} = createProductsDto;
        //cek nomor SKU ada yang sama atau tidak
        const existingSku = await this.prisma.products.findUnique({where: {sku: sku}});  

        // kalau ada item yang sama, return error ke pengguna
        if (existingSku) {
            throw new ConflictException('SKU ' + sku + ' already exists');
        }

        return this.prisma.products.create({data: {sku, name, price, qty, category, pictureUrl}});
    }

    //buat upade product
    update(id: string, updateProductDto: ProductUpdateDto) {
        return this.prisma.products.update({where: {id: Number(id)}, data: updateProductDto});
    }

    //buat delete product
    async delete(id: string) {
        const product = Number(id);
        const existingProduct = await this.prisma.products.findUnique({where: {id: Number(id)}});

        // cek kalau id tidak ada
        if (!existingProduct) {
            throw new ConflictException('ID not found');
        }

        return this.prisma.products.delete({where: {id: Number(id)}});  
    }

    //get products by id lalu return semua
    get(id: string) {
        // cek kalau id tidak ada
        if (!id) {
            throw new ConflictException('ID not found');
        }
        const product = this.prisma.products.findUnique({where: {id: Number(id)}});
        return product;
    }

    //get all products tapi pakai pagination
    getAll() {
        return this.prisma.products.findMany();
    }

    //buat search product menggunakan nama atau sku
    search(name: string) {
        const product = this.prisma.products.findMany({
            where: {
                OR: [
                            {name: {
                                contains: name,
                                mode: 'insensitive'
                            },
                        },
                            {sku: {
                                contains: name,
                                mode: 'insensitive'
                            },
                        },
                    ],
            },
        });
        return product;
    }
    
}   
