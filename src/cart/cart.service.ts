import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { CartEntity } from './entity/cart.entity';

@Injectable()
export class CartService {
    constructor(@InjectRepository(CartEntity) 
        private cartRepository: Repository<CartEntity>) {}

        // creating a new cart for the currentuser
    async createCart(userId: string, itemDto: ItemDto, 
        subTotalPrice: number, totalPrice: number): Promise<CartEntity> {
        const newCart = await this.cartRepository.save({
            userId,
            items: [{ ...itemDto, subTotalPrice }],
            totalPrice
        });
        return newCart;
    }

    // gettting the user's cart
    async getCart(userId:string): Promise<CartEntity> {
        const cart = await this.cartRepository.findOne({ where: {userId}});
        return cart;
    }

    // deleting the user's cart
    async deleteCart(userId: string) {
        const deletedCart = await this.cartRepository.delete(userId);  
        return deletedCart; 
    }

    // recalculating the cart total when added or remove
    private recalculateCart(cart: CartEntity) {
        cart.totalPrice = 0;
        cart.items.forEach(item => {
            cart.totalPrice += (item.quantity * item.price);
        })
    }

    // Adding the items to cart
    async addItemTocart(userId: string, itemDto: ItemDto): Promise<CartEntity> {
        const { productId, quantity, price} = itemDto;
        const subTotalPrice = quantity * price;

        const cart = await this.getCart(userId);

        if (cart) {
            const itemIndex = cart.items.findIndex((item) =>  item.productId == productId);
            
            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                item.quantity = Number(item.quantity) + Number(quantity);
                item.subTotalPrice = item.quantity * item.price;

                cart.items[itemIndex] = item;
                this.recalculateCart(cart);
                return cart;
            } else {
                cart.items.push({ ...itemDto, subTotalPrice});
                this.recalculateCart(cart);
                return cart;
            }
        } else { 
            const newCart = await this.createCart(userId, itemDto, subTotalPrice, price);
            return newCart;
        }
    }

    // removing the an item from the cart
    async removeItemFromCart(userId:string, prodouctId:string): Promise<any> {
        const cart = await this.getCart(userId);

        const itemIndex = cart.items.findIndex((item) => item.productId == prodouctId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1)
            return cart;
        }
    }
 }
