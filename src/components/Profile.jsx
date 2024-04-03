import { useState } from "react";
import '../css/Profile.css'
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import User from "./User";


function chooseProfileList(besoin) {
    if (besoin == 2)
        return <MessageList/>
    //else if (besoin === "MsgETRep")
        //return <Recherche />
}

function Profile(props) {
    return (
        <div id="profile" className="CentralBanner">
            <img id="banner" src="images/TestBanner.jpg"/>
            <div id="ProfileHeader">
                <p>@{props.username}</p>
                <p>A rejoint le {props.date}</p>
                <p>Salut moi c'est Enzo PF je suis Stalky et j'aime les gros calins</p>
            </div>
            <div id="BouttonsListMessages">
                <button onClick={() => <MessageList/>}>Messages</button>
                <button onClick={() => chooseProfileList(2)}>Messages & réponses</button>
            </div>
        </div>
    )
}

export default Profile;