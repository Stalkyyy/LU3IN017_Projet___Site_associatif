import { useState } from "react";
import '../css/Home.css';
import User from "./User.jsx";
import Forum from "./Forum.jsx";
import Profile from "./Profile.jsx";
import Recherche from "./Recherche.jsx";
import UserBanner from "./UserBanner.jsx";
import ValidationInscription from "./ValidationInscription.jsx";

function Home(props) {
    
    const [isAdmin, setAdmin] = useState(true);
    const [homeCBpage, setHomeCBpage] = useState("forum");


    function chooseCentralBanner() {
        if (homeCBpage === "profile")
            return <Profile username="Stalky" date="17 mars 2024"/>
        else if (homeCBpage === "recherche")
            return <Recherche />
        else if (homeCBpage === "validation" && isAdmin)
            return <ValidationInscription/>
        else
            return <Forum isAdmin={isAdmin}/>
    }


    return (
        <div id="Home">
            <header id="header-Home">
                <img id="logo-left" src="/images/logo.png"/>
                <h1 id="titleWebsite">Organiz'Asso</h1>
                <img id="logo-right" src="/images/logo.png"/>
            </header>
            <div id="content-Home">
                <UserBanner logout={props.logout} isAdmin={isAdmin} setHomeCBpage={setHomeCBpage}/>

                {chooseCentralBanner()}
            </div>
        </div>
    )
}

export default Home