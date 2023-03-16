import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput  {
    id?: string;
    email: string;
    password: string;
    name: string;
    category: Prisma.UserCategoryCreateNestedOneWithoutUsersInput;
}