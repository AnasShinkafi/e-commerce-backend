import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemEntity {

    @PrimaryGeneratedColumn()
    productId: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable:false })
    price: number;

    @Column({})
    subTotalPrice: number;
    quantity: number;
}