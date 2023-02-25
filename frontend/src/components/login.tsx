import { FormEvent, CSSProperties, useState } from "react";
import "../styles/login.css";
import logo from "../images/logo-pastel-da-feira.webp";
import { Input } from "./input";

export function Login ()
{
    const [accept_inputs] = useState();

    function onInput (index : number, event : FormEvent)
    {
        var inputElement = event.target as HTMLInputElement;
        console.log(1 << index);
    }

    function onSubmit (event : FormEvent)
    {
        event.stopPropagation();
        event.preventDefault();

        var formData = new FormData(event.target as HTMLFormElement);
        var data = Object.fromEntries(formData.entries());

        console.log(data);
    }

    return (
        <>
            <header>
                <img src={logo} />
                <h1>Pastel de Feira</h1>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <Input name="username" title="Usuario" required={true} pattern="\w{6,}" tooltip="Letras e numeros (A-Z, 0-9), seis ou mais (6+)"/>
                    <Input name="password" title="Senha" type="password" required={true} pattern="\w{6,}" tooltip="Letras e numeros (A-Z, 0-9), seis ou mais (6+)"/>
                    <button disabled={false}>ENTRAR</button>
                </form>
            </main>
        </>
    );
}