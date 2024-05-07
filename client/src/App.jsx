import { useEffect, useState } from "react";
import './App.css';
import SignupInProgress from "./components/SignupInProgress.jsx";
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from "./components/Home.jsx";


function App(props) {
    // Gère le statue de connexion de l'utilisateur.
    const [isConnected, setConnect] = useState(false);

    // Gère la page du site.
    const [page, setPage] = useState("login");

    // Gère le compte utilisateur du site.
    const [user, setUser] = useState(null);

    /*
     * Choisis la page à mettre en avant.
     *
     * Si l'utilisateur est connecté, alors il rentre dans le forum.
     * S'il a choisi de s'inscrire, il ira sur la page d'inscription.
     * Sinon, il sera sur la page de connexion.
     */
    function choosePage() {
        if (isConnected)
            return <Home logout={getLogout} user={user}/>;

        else if (page === "signup_page")
            return <Signup login={getConnected} login_page={getLogout} signupInProgress_page={getSignupInProgress}/>;

        else if (page === "signupInProgress_page")
            return <SignupInProgress login_page={getLogout} signup_page={getSignup}/>;

        else 
            return <Login login={getConnected} signup_page={getSignup} signupInProgress_page={getSignupInProgress}/>;
    }


    // Connexion de l'utilisateur, il rentre dans le home.
    function getConnected(user) {
        setUser(user);
        setConnect(true);
        setPage("home_page");
    }

    // Deconnexion de l'utilisateur, il retourne sur la page de connexion.
    function getLogout() {
        setUser(null);
        setConnect(false);
        setPage("login_page");
    }

    // L'utilisateur va sur la page d'inscription. Il doit être déconnecté.
    function getSignup() {
        setUser(null);
        setConnect(false);
        setPage("signup_page");
    }

    // Quand l'utilisateur s'incrit ou  se connecte à un compte en cours de validation, il ira sur cette page.
    function getSignupInProgress() {
        setUser(null);
        setConnect(false);
        setPage("signupInProgress_page");
    }


    /*
     * Si on est dans la page Home, on passe l'overflow du body en hidden.
     */
    useEffect(() => {
        if (page === "home_page")
            document.body.classList.add('home-page');
        else
            document.body.classList.remove('home-page');
    }, [page]);


    return (
        <div className="App">
            {choosePage()}
        </div>
    )
}

export default App;