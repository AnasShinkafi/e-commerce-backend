import { IsString } from "class-validator";

export class FilterProductDto {

    @IsString()
    search: string;

    @IsString()
    category: string;
}