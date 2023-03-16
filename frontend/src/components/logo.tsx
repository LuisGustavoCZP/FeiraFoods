import logo from "../images/logo-pastel-da-feira.webp";
import "../styles/logo.css";

export function Logo () 
{
    return (
        <div className="Logo">
            <img src={logo} alt="Logo"/>
            <h1>Pastel de Feira</h1>
            <h1 className="shadow">Pastel de Feira</h1>
        </div>
    );
}