import { createContext, ReactNode, useEffect, useState } from "react";
import { Login } from "../components/login";
import { Modal } from "../components/modal";
import { User } from "../models/user";

export interface UserContextProps 
{
    user?: User;
    login: (email: string, password: string) => Promise<string | undefined>;
    request: (body? : any) => Promise<any | undefined>;
    openModal: (node : ReactNode) => void;
    closeModal: () => void;
}

export interface UserContextProviderProps 
{
    children: ReactNode,
}

const hostname = window.location.hostname;
const host = `http://${hostname}:3000`;

const defaultUCP = {
    user: undefined,
    login: async () => "",
    request: async () => undefined,
    openModal: () => {},
    closeModal: () => {}
};

export const UserContext = createContext<UserContextProps>(defaultUCP);

export function UserContextProvider ({children} : UserContextProviderProps) 
{
    const [user, setUser] = useState<User>();
    const [modal, setModal] = useState<ReactNode | null>(null);

    function getToken ()
    {
        const cookie = document.cookie.split("=");
        return cookie.length > 0 ? cookie[1] : "";
    }

    function setToken (token : string)
    {
        document.cookie = `token=${token}`
    }

    function openModal (node : ReactNode)
    {
        setModal(node);
    }

    function closeModal ()
    {
        setModal(null);
    }

    async function login (email: string, password: string)
    {
        const resp = await fetch(`${host}/auth`, 
        {
            method:"POST",
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
            },
            credentials:"include",
            body: JSON.stringify({email, password})
        });

        if(resp.status !== 201 && resp.status !== 200) 
        {
            const error = await resp.json();
            return error.message;
        }
        const {access_token: accessToken} = await resp.json();

        setToken(accessToken);

        if(!verify(accessToken)) return "";
        return undefined;
    }

    async function verify(token : string) 
    {
        const resp = await fetch(`${host}/users/self`, {
            method:"GET",
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        }).catch((error) => error);

        if(resp.status !== 201 && resp.status !== 200) return false;

        const user = await resp.json();

        setUser(user);

        return true;
    }

    async function check(token : string) 
    {
        if(token)
        {
            verify(token);
        }
        else setToken("");    
    }

    async function request(route : string, method: "POST" | "GET" | "PATCH" | "DELETE" = "GET", body? : any) 
    {
        const reqUrl = `${host}${route}`;
        const reqInfo : RequestInit = {
            method,
            mode:"cors",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials:"include",
        }

        if(body)
        {
            return await fetch(reqUrl, 
            {
                ...reqInfo,
                body: JSON.stringify(body)
            });
        }
        else
        {
            return await fetch(reqUrl, reqInfo);
        }
    }

    const value = 
    {
        user,
        login,
        request,
        openModal,
        closeModal
    };

    const token = getToken ();

    useEffect(() => 
    {
        check(token);
    }, []);

    return (
        <UserContext.Provider value={value}>
            { token? (user ? children : <></>) : <Login/>}
            { modal? <Modal>{modal}</Modal> : <></> }
        </UserContext.Provider>
    );
    
}