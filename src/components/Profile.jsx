import { useState } from "react";
import '../css/Profile.css'

function Profile(props) {
    return (
        <div id="Profile" className="CentralBanner">
            <p>Profile de {props.username}</p>
        </div>
    )
}

export default Profile;