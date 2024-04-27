import '../css/SignupInProgress.css'

function SignupInProgress(props) {
    return (
        <div className="SignupInProgress">
            <h1>Veuillez patienter...</h1>

            <p>Votre demande d'inscription est en cours de traitement par nos administrateurs.</p>

            <hr></hr>
                
            <button onClick={props.login_page}>Log In</button>
            <button onClick={props.signup_page}>Sign up</button>
        </div>
    );
}

export default SignupInProgress