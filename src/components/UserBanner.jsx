import React from "react";
import '../css/UserBanner.css'

function UserBanner() {

    return (
        <div id="UserBanner">
            <img id="profilePic" src="/images/PfpLapis_1.jpg" alt="Profile Pic"/>
            <p id="pseudo">Stalky</p>
        </div>
    )
}

export default UserBanner;