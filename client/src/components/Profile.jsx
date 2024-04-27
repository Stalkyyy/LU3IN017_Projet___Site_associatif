import { useState } from "react";
import '../css/Profile.css'
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import User from "./User";

function Profile(props) {
    return (
        <div id="Profile" className="CentralBanner">
            <p>Profile de {props.username}</p>
        </div>
    )
}

export default Profile;