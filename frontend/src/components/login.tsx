import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import "../styles/login.css";
import { Input } from "./input";
import { Logo } from "./logo";

export function Login ()
{
    const { login } = useContext(UserContext);
    const [ error, setError ] = useState("");

    async function onSubmit (event : FormEvent)
    {
        event.stopPropagation();
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const { email, password } = data;

        const error = await login(email as string, password as string);
        if(error != undefined) setError(error);
        else setError("Guardado!");
    }

    return (
        <main className="login">
            <div>
                <Logo/>
                <form onSubmit={onSubmit}>
                <Input name="email" title="Usuario" type="email" required={true} pattern="\w{1,}@\w{1,}(\.com\.\w{2}|\.com)" tooltip="Letras e numeros (A-Z, 0-9), seis ou mais (6+)"/>
                <Input name="password" title="Senha" type="password" required={true} pattern=".{6,}" tooltip="Letras e numeros (A-Z, 0-9), seis ou mais (6+)"/>
                <button disabled={false}>ENTRAR</button>
                </form>
            </div>
            <div>
                {error}
            </div>
        </main>
    );
}