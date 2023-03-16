export interface User 
{
    id: string,
    email: string,
    name: string,
    category: {
        name: string,
        roles: {name: string}[]
    }
}