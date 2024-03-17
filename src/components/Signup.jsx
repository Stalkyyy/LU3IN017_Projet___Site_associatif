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
            props.login();
    }

    return (
        <div className="Signup">
            <h1>Sign up here</h1>

            <label htmlFor="firstName">First name</label>
            <input type="text" id="FirstName" placeholder="First name" onChange={getFirstName} />
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="LastName" placeholder="Last name" onChange={getLastName} />

            <label type="text" htmlFor="Signup_email">Email</label>
            <input type="text" id="Signup_email" placeholder="Email" onChange={getEmail} />

            <label type="text" htmlFor="Signup_password1">Password</label>
            <input type="password" id="Signup_password1" placeholder="Password" onChange={getPass1} />

            <label type="text" htmlFor="Signup_password2">Confirm password</label>
            <input type="password" id="Signup_password2" placeholder="Password" onChange={getPass2} />

            <button onClick={submitHandler}>Sign Up</button>

            <p style={{color:"#C84862"}}>{errorPassword.message}</p>

            <hr></hr>
                
            <button onClick={props.login_page}>Log In</button>
        </div>
    );
}

export default Signup