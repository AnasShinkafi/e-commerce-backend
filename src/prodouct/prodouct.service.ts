import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProductDto } from 'src/dto/filter-product.dto';
import { CreateProductDto } from 'src/dto/product.dto';
import { ProductEntity } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdouctService {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity> 
    ) {}

    async getFilterProducts(filterProductDto: FilterProductDto): Promise<ProductEntity[]> {
        const { category, search } = filterProductDto;
        let prodoucts = await this.getAllProducts();

        if (search) {
            prodoucts = prodoucts.filter(prodouct => 
                prodouct.name.includes(search) || 
                prodouct.description.includes(search)
            );
        }

        if (category) {
            prodoucts = prodoucts.filter(prodouct => prodouct.category === category)
        }
        return prodoucts;
    }

    async getAllProducts(): Promise<ProductEntity[]> {
        const prodoucts = await this.productRepository.find();
        return prodoucts;
    }

    async getProduct(id: number): Promise<ProductEntity> {
        const prodouct = await this.productRepository.findOne({ where: {id} });
        return prodouct;
    }

    async addProduct( createProductDto: CreateProductDto): Promise<ProductEntity> {
        const newProduct = await this.productRepository.save(createProductDto);
        return newProduct;
    }

    async updateProduct(id: number, createProductDto: CreateProductDto) {
        const updatedProduct = await this.productRepository.update(id, createProductDto);
        return updatedProduct;
    }

    async deleteProduct(id: number): Promise<any> {
        const deletedProduct = await this.productRepository.delete(id);
        return deletedProduct;
    }
 }
