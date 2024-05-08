import { useState } from "react";
import UserBanner from "./UserBanner.jsx";
import Validation from "./Validation.jsx";
import Profile from "./Profile.jsx";
import Search from "./Search.jsx";
import Forum from "./Forum.jsx";
import '../css/Home.css';

function Home(props) {
    // Garde en mémoire quel page le site affichera (forum, profil, recherche, validation...)
    // De plus, il garde en mémoire quel profil (userFocused) l'utilisateur souhaite voir.
    // Enfin, refreshKey est un état permettant de rafraichir le composant Profile.
    const [homeCBpage, setHomeCBpage] = useState("forum");
    const [userFocused, setUserFocused] = useState(props.user._id);
    const [refreshKey, setRefreshKey] = useState(0);

    function visitProfile(userid) {
        setUserFocused(userid);

        if (homeCBpage === "profile") 
            setRefreshKey(oldKey => oldKey + 1);
        else 
            setHomeCBpage("profile");
    }


    function chooseCentralBanner() {
        if (homeCBpage === "profile")
            return <Profile key={refreshKey} user={props.user} userFocused={userFocused} visitProfile={visitProfile}/>
        else if (homeCBpage === "search")
            return <Search key={refreshKey} user={props.user} visitProfile={visitProfile}/>
        else if (homeCBpage === "validation" && props.user.status === "admin")
            return <Validation key={refreshKey} user={props.user}/>
        else
            return <Forum key={refreshKey} user={props.user} visitProfile={visitProfile}/>
    }


    return (
        <div id="Home">
            <header id="header-Home">
                <img id="logo-left" src="/images/logo.png"/>
                <h1 id="titleWebsite">Organiz'Asso</h1>
                <img id="logo-right" src="/images/logo.png"/>
            </header>
            <div id="content-Home">
                <UserBanner logout={props.logout} user={props.user} isAdmin={props.user.status === "admin"} setHomeCBpage={setHomeCBpage} visitProfile={visitProfile}/>

                {chooseCentralBanner()}
            </div>
        </div>
    )
}

export default Home