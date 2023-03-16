import { Prisma } from "@prisma/client";

export class FoodItem implements Prisma.FoodItemCreateInput 
{
    name: string;
    description: string;
    price: number;
    image: string;
}
