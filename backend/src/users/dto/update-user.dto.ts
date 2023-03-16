import { PartialType } from "@nestjs/mapped-types";
import { Prisma } from "@prisma/client";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) 
{
}