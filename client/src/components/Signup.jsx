import { useState, useEffect } from "react";
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/Signup.css'


function Signup(props) {
    // Gère les différentes informations inscrites par l'utilisateur pour la création de compte.
    const [firstName, setFirstName] = useState({validation : false, content: ""});
    const [lastName, setLastName] = useState({validation : false, content: ""});
    const [mail, setMail] = useState({validation : false, content: ""});
    const [pass1, setPass1] = useState({validation : false, content: ""});
    const [pass2, setPass2] = useState({validation : false, content: ""});
    const [errorPassword, setErrorPassword] = useState("");

    function getFirstName(event) { 
        setFirstName({
            validation: event.target.value,
            content : event.target.value
        });
    }

    function getLastName(event) { 
        setLastName({
            validation: event.target.value,
            content : event.target.value
        });
    }

    function getMail(event) {
        setMail({
            validation: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(event.target.value),
            content: event.target.value
        });
    }

    function getPass1(event) {
        setPass1({
            validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(event.target.value),
            content: event.target.value
        });
    }

    function getPass2(event) {
        setPass2({
            validation: pass1.validation && event.target.value === pass1.content,
            content: event.target.value
        });
    }



    // Fonction gérant le message d'erreur, pour la validité des mots de passe.
    function errorMessage() {
        if (!pass1.content && !pass2.content)
            return setErrorPassword("");

        if (!pass1.validation)
            return setErrorPassword("Ton mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial (@ $ ! % * ? &).");

        if (!pass2.validation)
            return setErrorPassword("Les deux mots de passe doivent être identiques !");

        setErrorPassword("");
    }

    useEffect(errorMessage, [pass1, pass2]);



    // Gère la demande serveur au niveau de l'inscription d'un utilisateur.
    function handleSubmit() {
        if (!(firstName.validation && lastName.validation && mail.validation && pass2.validation))
            return;

        axios.post(`${URL()}/user/create`, { mail : mail.content, password : pass2.content, firstName : firstName.content, lastName : lastName.content })
            .then((response) => {
                if (response.status === 200)
                    props.signupInProgress_page();
                else
                    setErrorPassword(response.data.message);
            })
            .catch(err => {
                console.error(err);
                setErrorPassword(err.response.data.message);
            });
    }

    

    return (
        <div className="Signup">
            <h1>Inscription</h1>

            <label htmlFor="firstName">Prénom</label>
            <input className={firstName.validation ? "valid" : "invalid"} type="text" id="firstName" placeholder="Prénom" onChange={getFirstName} />
            <label htmlFor="lastName">Nom de famille</label>
            <input className={lastName.validation ? "valid" : "invalid"} type="text" id="lastName" placeholder="Nom de famille" onChange={getLastName} />

            <label type="text" htmlFor="mail">Email</label>
            <input className={mail.validation ? "valid" : "invalid"} type="text" id="mail" placeholder="Email" onChange={getMail} />

            <label type="text" htmlFor="password">Mot de passe</label>
            <input className={pass1.validation ? "valid" : "invalid"} type="password" id="password" placeholder="Mot de passe" onChange={getPass1} />

            <label type="text" htmlFor="password2">Confirmation du mot de passe</label>
            <input className={pass2.validation ? "valid" : "invalid"} type="password" id="password2" placeholder="Mot de passe" onChange={getPass2} />

            <button onClick={handleSubmit}>S'incrire</button>

            <p style={{color:"#C84862"}}>{errorPassword}</p>

            <hr></hr>
                
            <button onClick={props.login_page}>Se connecter</button>
        </div>
    );
}

export default Signup