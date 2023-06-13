import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    description: string;

    @IsNotEmpty()
    @MinLength(3)
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    category: string;
}