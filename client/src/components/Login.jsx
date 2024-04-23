import { useState } from "react";
import axios from 'axios';
import URL from '../Url.jsx';
import '../css/Login.css'

function Login(props) {
    // Gère le login et le mot de passe inscrits par l'utilisateur.
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function getMail(event) { setMail(event.target.value); }
    function getPassword(event) { setPassword(event.target.value); }


    function handleSubmit() {
        console.log(mail);
        axios.post(`${URL()}/auth/login`, { mail, password })
            .then((response) => {
                if (response.status === 200) {
                    props.login();
                    setError(null);
                } else {
                    setError(response.message);
                }
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
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