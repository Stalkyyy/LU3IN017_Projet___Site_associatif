import { useState } from 'react';
import '../css/UserBanner.css'

function UserBanner(props) {

    function addValidationAdminButton() {
        if (props.isAdmin) 
            return <button onClick={() => {props.setHomeCBpage("validation")}}>Validation</button>
    }

    return (
        <div id="UserBanner">
            <img id="profilePic" src="/images/PfpLapis_1.jpg" alt="Profile Pic"/>
            <button onClick={() => {props.setHomeCBpage("profile")}}>Ton profile</button>

            <button onClick={() => {props.setHomeCBpage("forum")}}>Forums</button>
            <button onClick={() => {props.setHomeCBpage("recherche")}}>Recherche</button>
            {addValidationAdminButton()}

            <button id="logoutButton" onClick={props.logout}>Se déconnecter</button>
        </div>
    )
}

export default UserBanner;