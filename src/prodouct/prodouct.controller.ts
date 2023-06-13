import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { FilterProductDto } from 'src/dto/filter-product.dto';
import { CreateProductDto } from 'src/dto/product.dto';
import { ProdouctService } from './prodouct.service';

@Controller('prodouct')
export class ProdouctController {
    constructor(private productService: ProdouctService) {}
    @Get('/')
    async getProducts(@Query() filterProductDto: FilterProductDto) {
        if (Object.keys(filterProductDto).length) {
            const filteredProducts = await this.productService.getFilterProducts(filterProductDto);
            return filteredProducts;
        } else {
            const allProducts = await this.productService.getAllProducts();
            return allProducts;
        }
    }

    @Get('/id')
    async getProduct(@Param('id') id: number) {
        const product = await this.productService.getProduct(id);
        if (!product) throw new NotFoundException('Product does not exist');
            return product
    }

    @Post('/')
    async addProduct(@Body() createProductDto: CreateProductDto) {
        const prodouct = await this.productService.addProduct(createProductDto);
        return prodouct;
    }

    @Put('/id') 
    async updateProduct(@Param('id') id: number, @Body() createProductDto: CreateProductDto) {
        const prodouct = await this.productService.updateProduct(id, createProductDto);
        if (!prodouct) throw new NotFoundException('Product does not exist');
        return prodouct
    }

    @Delete('/id') 
    async deleteProduct(@Param('id') id: number ) {
        const prodouct = await this.productService.deleteProduct(id);
        if (!prodouct) throw new NotFoundException('Product does not exit.');
        return prodouct;
    }
}
