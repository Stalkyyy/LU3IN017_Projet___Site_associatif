import { useState } from 'react';
import axios from 'axios';
import '../css/UserBanner.css'
import URL from '../Url.jsx';
import User from './User';

function UserBanner(props) {

    function addValidationAdminButton() {
        if (props.isAdmin) 
            return <button onClick={() => {props.setHomeCBpage("validation")}}>Validation</button>
    }

    function handleSubmit() {
        axios.delete(`${URL()}/auth/logout`)
            .then((response) => {
                if (response.status === 200)
                    props.logout();
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <div id="UserBanner">
            <img id="profilePic" src="/images/PfpLapis_1.jpg" alt="Profile Pic"/>
            <button onClick={() => {props.setHomeCBpage("profile")}}>Ton profile</button>

            <button onClick={() => {props.setHomeCBpage("forum")}}>Forums</button>
            <button onClick={() => {props.setHomeCBpage("recherche")}}>Recherche</button>
            {addValidationAdminButton()}

            <button id="logoutButton" onClick={handleSubmit}>Se déconnecter</button>
        </div>
    )
}

export default UserBanner;