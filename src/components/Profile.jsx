import { useState } from "react";
import '../css/Profile.css'
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import User from "./User";

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
                <button>Messages</button>
                <button>Messages & réponses</button>
            </div>
        </div>
    )
}

export default Profile;