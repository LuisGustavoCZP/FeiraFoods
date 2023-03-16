import {PropsWithChildren} from "react";
import "../../styles/modal.css";

export function Modal ({children} : PropsWithChildren)
{
    return (
        <div className="Modal">
            {children}
        </div>
    );
}