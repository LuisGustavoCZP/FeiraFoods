import { Prisma } from "@prisma/client";

export class UserCategory implements Prisma.UserCategoryCreateInput  {
    id?: number;
    name: string;
    roles: Prisma.UserRoleCreateNestedManyWithoutCategoriesInput;
}