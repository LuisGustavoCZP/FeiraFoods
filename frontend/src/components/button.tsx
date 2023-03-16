import { createElement, ReactNode, ButtonHTMLAttributes } from "react";
import "../styles/button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
{
    tag? : string;
    selected?: boolean;
}

export function Button ({tag = "span", selected = false, children, onClick, className} : ButtonProps )
{
    const CustomTag = `${tag}` as keyof JSX.IntrinsicElements;

    return (
        <CustomTag className={`Button ${selected? "selected" : ""} ${className?className:""}`} onClick={onClick as any}>
            <button>{children}</button>
        </CustomTag>
    );
}