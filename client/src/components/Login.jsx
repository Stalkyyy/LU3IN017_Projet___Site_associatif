import { useState } from "react";
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/Login.css'

function Login(props) {
    // Garde en mémoire le mail et le mot de passe inscrits par l'utilisateur.
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function getMail(event) { setMail(event.target.value); }
    function getPassword(event) { setPassword(event.target.value); }

    

    // Gère la demande serveur pour se connecter à un compte.
    function handleSubmit() {
        axios.post(`${URL()}/auth/login`, { mail, password })
            .then((response) => {
                if (response.status === 200)
                    response.data.user.status === "invitation" ? props.signupInProgress_page() : props.login(response.data.user);
                else
                    setError(response.data.message);
            })
            .catch(err => {
                console.error(err);
                setError(err.response.data.message);
            });
    }



    return (
            <div className="Login">
                <h1>Connexion</h1>
                <label htmlFor="mail">Email</label>
                <input id="mail" type="text" placeholder="Adresse mail" onChange={getMail} />

                <label htmlFor="password">Mot de passe</label>
                <input id="password" type="password" placeholder="Mot de passe" onChange={getPassword} />

                <button onClick={handleSubmit}>Se connecter</button>
                <a>Mot de passe oublié ?</a>
                {error && <div className="error">{error}</div>}

                <hr></hr>
                
                <button onClick={props.signup_page}>S'inscrire</button>
            </div>
    );
}

export default Login