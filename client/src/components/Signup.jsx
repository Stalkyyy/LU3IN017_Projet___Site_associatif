import { useState, useEffect } from "react";
import '../css/Signup.css'

function Signup(props) {
    // Gère les différentes valeurs inscrites par l'utilisateur à l'inscription.
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    function getFirstName(event) { setFirstName(event.target.value); }
    function getLastName(event) { setLastName(event.target.value); }
    function getEmail(event) { setEmail(event.target.value); }
    function getPass1(event) { setPass1(event.target.value); }
    function getPass2(event) { setPass2(event.target.value); }



    /*
     * Informations sur les conditions du choix de mot de passe.
     * - status : Si true alors les conditions ne sont pas respectées, sinon oui.
     * - message : Correspond au message d'erreur, s'il y en a un.
     */
    const [errorPassword, setErrorPassword] = useState({status: true, message: ""});

    function checkPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    function messageErrorPassword() {
        if (pass1 === "")
            return setErrorPassword({status: true, message: ""});

        const samePass = pass1 === pass2;
        const isGoodPassword = checkPassword(pass1);

        if (!isGoodPassword)
            return setErrorPassword({
                status: true,
                message: "Ton mot de passe doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial (@ $ ! % * ? &)." 
            });

        if (!samePass)
            return setErrorPassword({
                status: true,
                message: "Les deux mots de passe doivent être identiques !"
            });

        setErrorPassword({status: false, message: ""});
    }

    useEffect(messageErrorPassword, [pass1, pass2]);


    
    function submitHandler(event) {
        if (errorPassword.status === false)
            props.signupInProgress_page();
    }

    return (
        <div className="Signup">
            <h1>Inscription</h1>

            <label htmlFor="firstName">Prénom</label>
            <input type="text" id="FirstName" placeholder="Prénom" onChange={getFirstName} />
            <label htmlFor="lastName">Nom de famille</label>
            <input type="text" id="LastName" placeholder="Nom de famille" onChange={getLastName} />

            <label type="text" htmlFor="Signup_email">Email</label>
            <input type="text" id="Signup_email" placeholder="Email" onChange={getEmail} />

            <label type="text" htmlFor="Signup_password1">Mot de passe</label>
            <input type="password" id="Signup_password1" placeholder="Mot de passe" onChange={getPass1} />

            <label type="text" htmlFor="Signup_password2">Confirmation du mot de passe</label>
            <input type="password" id="Signup_password2" placeholder="Mot de passe" onChange={getPass2} />

            <button onClick={submitHandler}>S'incrire</button>

            <p style={{color:"#C84862"}}>{errorPassword.message}</p>

            <hr></hr>
                
            <button onClick={props.login_page}>Se connecter</button>
        </div>
    );
}

export default Signup