import { Prisma } from "@prisma/client";
import { IsEmail, IsString, IsStrongPassword, notContains } from "class-validator";
import * as ClassValidator from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto implements User
{
    @IsEmail()
    email: string;
    @IsString()
    name: string;
    @IsStrongPassword()
    password: string;
    category: Prisma.UserCategoryCreateNestedOneWithoutUsersInput;
}