import { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FoodCategory } from "./foodcategory";
import "../../styles/foodmenu.css";

export function FoodMenu ()
{
    const { request } = useContext(UserContext);
    const [items, setItems] = useState([]);

    async function RequestMenu ()
    {
        const resp = await request("/foodcategories");

        if(resp.status !== 200) 
        {
            const error = await resp.json();
            return error.message;
        }

        const items = await resp.json();
        setItems(items);
    }

    useEffect(() => 
    {
        RequestMenu ();
    }, []);

    function createCategories () : ReactNode
    {
        return items.map((item, index) => 
            <li key={`FoodCategory ${index}`}><FoodCategory category={item} /></li>
        );
    }
    
    return (
        <section className="FoodMenu">
            <h2>Cardápio</h2>
            <ul>
                {createCategories ()}
            </ul>
        </section>
    );
}