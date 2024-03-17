import { useState } from "react";
import '../css/Login.css'

function Login(props) {
    // Gère le login et le mot de passe inscrits par l'utilisateur.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function getEmail(event) { setEmail(event.target.value); }
    function getPassword(event) { setPassword(event.target.value); }


    
    return (
            <div className="Login">
                <h1>Connexion</h1>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Email" onChange={getEmail} />

                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" placeholder="Mot de passe" onChange={getPassword} />

                <button onClick={props.login}>Se connecter</button>
                <a>Mot de passe oublié ?</a>

                <hr></hr>
                
                <button onClick={props.signup_page}>S'inscrire</button>
            </div>
    );
}

export default Login