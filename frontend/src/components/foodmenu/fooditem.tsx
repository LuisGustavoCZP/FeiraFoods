import "../../styles/fooditem.css";
import { Button } from "../button";
import { Edit, AddCircle } from "@mui/icons-material";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { FoodItemCreation } from "./fooditemcreation";

export interface IStorageItem 
{
    id: number,
    total: number,
    foodItem: IFoodItem
}

export interface IFoodItem 
{
    id: number;
    name : string;
    description : string;
    image: string;
    price: number;
}

export function FoodItem ({item, editable, deletable} : {item? : IStorageItem, editable? : boolean, deletable? : boolean})
{
    const { openModal } = useContext(UserContext);

    if(!item)
    {
        return (
        <section className="FoodItem Empty">
            {/* <div className="" /> */}
            <Button onClick={() => openModal(<FoodItemCreation />)}><AddCircle/></Button>
        </section>
    )
    }

    const {id, total, foodItem} = item;

    function price ()
    {
        return foodItem.price?.toLocaleString("pt-br", 
        { 
            style: 'currency',
            currency: 'BRL',
        })
    }

    return (
        <section className="FoodItem">
            <img src={foodItem.image} alt={foodItem.name} />
            <div>
                <span>
                    <h4>{foodItem.name}</h4>
                    {editable ? <Button><Edit /></Button> : <></>}
                </span>
                <p>{foodItem.description}</p>
                <span>
                    <h5>{total}</h5>
                    <h5>{price ()}</h5>
                </span>
            </div>
        </section>
    );
}