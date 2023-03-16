import { useContext, useEffect, useState, ReactNode } from "react";
import { UserContext } from "../../contexts/UserContext";
import "../../styles/main.css";
import { Consumers } from "../consumers";
import { Employers } from "../employers";
import { FoodMenu } from "../foodmenu";
import { Profile } from "../profile";
import { Menu } from "./menu";

export function Main ()
{
    const { user } = useContext(UserContext);
    const [ getMenu, setMenu ] = useState("");

    const menus : {[key: string] : ReactNode} = {
        "ProfileView":<Profile />,
        "UsersView":<Employers/>,
        "FoodMenuView":<FoodMenu />,
        "ConsumerView":<Consumers />,
    }
    console.log(getMenu);

    return (
        <main>
            <Menu menuInfo={{getMenu, setMenu}}/>
            { menus[getMenu] }
        </main>
    );
}