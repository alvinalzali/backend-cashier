import { Body, Controller, Get, Delete, Patch, Post, UseGuards, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsDto, ProductUpdateDto } from './dto/products.dto';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    //endpoint Create Products
    @Post('add')
    create(@Body() createProductsDto: ProductsDto) {
        return this.productsService.create(createProductsDto);
    }

    //endpoint Update Product
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: ProductUpdateDto) {
        return this.productsService.update(id, updateProductDto);
    }

    //endpoint Delete Product
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productsService.delete(id);
    }

    //endpoint Get Product by id
    @Get(':id')
    get(@Param('id') id: string) {
        return this.productsService.get(id);
    }

    //endpoint Get All
    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    //endpoint Search by Name/id
    @Get('search/:name')
    search(@Param('name') name: string) {
        return this.productsService.search(name);
    }
}
