import { FormEvent } from "react";

interface InputProps {
    type? : "text" | "password" | "email",
    name : string,
    title? : string,
    required? : boolean,
    pattern? : string,
    tooltip? : string,
}

export function Input ({name, title, type = "text", pattern = undefined, tooltip = undefined, required = false} : InputProps)
{
    function onInput (event : FormEvent<HTMLInputElement>)
    {
        var inputElement = event.target as HTMLInputElement;
        
    }

    return (
        <span>
            {title?<label htmlFor={name}>{title}</label>:<></>}
            <input type={type} name={name} id={name} onInput={onInput} required={required} pattern={pattern} title={tooltip}/>
        </span>
    );
}