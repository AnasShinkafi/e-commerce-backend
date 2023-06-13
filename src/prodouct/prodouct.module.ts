import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entity/product.entity';
import { ProdouctController } from './prodouct.controller';
import { ProdouctService } from './prodouct.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProdouctController],
  providers: [ProdouctService]
})
export class ProdouctModule {}
