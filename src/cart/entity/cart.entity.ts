import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemEntity } from "./item.entity";

@Entity()
export class CartEntity {

    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    items: ItemEntity[];

    @Column()
    totalPrice: number;
}