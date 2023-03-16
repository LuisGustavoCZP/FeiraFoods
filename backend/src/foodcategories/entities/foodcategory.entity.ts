import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class FoodCategory implements Prisma.FoodCategoryCreateInput
{
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    description: string;
}
