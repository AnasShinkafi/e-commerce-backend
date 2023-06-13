import { IsNumber, IsString } from "class-validator";

export class ItemDto {

    @IsString()
    productId: string;

    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}