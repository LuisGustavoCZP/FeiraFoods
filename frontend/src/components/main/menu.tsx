import { Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "../../styles/menu.css";
import { Button } from "../button";
import { AccountBox, MenuBook, People, Work } from "@mui/icons-material";

export interface MenuInfo {
    getMenu:string, 
    setMenu:Dispatch<string>
}

interface MenuOption 
{
    role: string,
    show: ReactNode
}

const menulist : MenuOption[] = 
[
    { role:"ProfileView",   show:(<>Perfil<AccountBox /></>)},
    { role:"UsersView",     show:(<>Empregados<Work /></>)},
    { role:"FoodMenuView",  show:(<>Cardápio<MenuBook /></>)},
    { role:"ConsumerView",  show:(<>Clientes<People /></>)},
];

export function Menu ({menuInfo} : {menuInfo : MenuInfo})
{
    const {user} = useContext(UserContext);
    const [options, setOptions] = useState<MenuOption[]>([]);
    let selected : HTMLElement;

    function selectMenu (target : HTMLElement, role : string)
    {
        if(selected)
        {
            selected.classList.remove("selected");
        }

        selected = target.parentElement!;
        selected.classList.add("selected");

        menuInfo.setMenu(role);
    }

    useEffect(() => 
    {
        const roles = user!.category.roles;
        const options = menulist.filter(({role}) => 
        {
            return roles.find((r) => r.name == role);
        });

        if(options.length > 0) menuInfo.setMenu(options[0].role);

        setOptions(options);
    }, [user]);

    function loadOptions ()
    {
        return options.map(({show, role}, i) => 
        {
            return (
                <Button tag="li" key={`menu-${i}`} onClick={(e) => 
                {
                    selectMenu(e.target as HTMLElement, role);
                }} selected={menuInfo.getMenu == role}>{show}
                </Button>
            )
        });
    }

    return (
        <div className="Menu">
            <ul>
                {loadOptions()}
            </ul>
        </div>
    );
}