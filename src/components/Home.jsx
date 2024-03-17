import { useState } from "react";
import '../css/Home.css';
import Forum from "./Forum.jsx";
import Profile from "./Profile.jsx";
import UserBanner from "./UserBanner.jsx";

function Home(props) {
    
    const [isAdmin, setAdmin] = useState(true);
    const [homePage, setHomePage] = useState("profile");


    function chooseHomePage() {
        if (homePage === "profile")
            return <Profile />
        else
            return <Forum isAdmin={isAdmin}/>
    }


    return (
        <div id="Home">
            <header id="header-Home">
                <img id="logo" src="/images/logo.png"/>
                <form id="searchForum">
                    <input id="inputSearchForum" type="text" placeholder="Rechercher sur le forum" />
                </form>
                <button id="logoutButton" onClick={props.logout}>Log out</button>
            </header>
            <div id="CentralBanner">
                <div id="LeftBanner">
                    <UserBanner />
                </div>
                {chooseHomePage()}
            </div>
        </div>
    )
}

export default Home