import { User } from "@prisma/client";

export interface UserDetail
{
    id: string,
    email: string,
    name: string,
    category: {
        name: string,
        roles: {name: string}[]
    }
}