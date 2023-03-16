import { FoodItem, IFoodItem } from "./fooditem";
import "../../styles/foodcategory.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

export interface IFoodCategory 
{
    id?: number
    name : string;
    description : string;
    foods: IFoodItem[]
}

export function FoodCategory ({category} : {category : IFoodCategory})
{
    const { request, user } = useContext(UserContext);
    const [items, setItems] = useState([]);
    
    async function RequestMenu ()
    {
        const resp = await request(`/storages/categories/${category.id}`);

        if(resp.status !== 200) 
        {
            const error = await resp.json();
            return error.message;
        }

        const [storage] = await resp.json();
        setItems(storage.items);
    }

    useEffect(() => 
    {
        RequestMenu ();
    }, []);

    const roles = user ? user.category.roles : [];
    const mayEdit = roles.some((role) => role.name == "FoodMenuEdit");
    const mayDelete = roles.some((role) => role.name == "FoodMenuDelete");

    function createItem ()
    {
        return items.map((item, index) => 
        (
            <li key={`FoodItem ${index}`}>
                <FoodItem item={item} editable={mayEdit} deletable={mayDelete} />
            </li>
        ));
    }

    return (
        <section className="FoodCategory">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <ul className="Category">
                {createItem ()}
                {mayEdit ? <li key={`FoodItem ${-1}`}><FoodItem /></li> : <></>}
            </ul>
        </section>
    );
}