import { Prisma } from "@prisma/client";
import { IsInt, IsNotEmpty } from "class-validator";

export class StorageItem implements Prisma.FoodStorageItemCreateInput 
{
    @IsInt()
    @IsNotEmpty()
    total: number;
}
