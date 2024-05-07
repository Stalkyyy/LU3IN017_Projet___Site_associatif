import { useState, useEffect } from "react";
import Invitation from "./Invitation.jsx";
import '../css/Validation.css'
import axios from 'axios';
import URL from '../Url.jsx';


function Validation(props) {
    const [users, setUsers] = useState([]);

    const refreshInvitations = () => {
        axios.get(`${URL()}/user/invitation`)
            .then(response => {
                setUsers(response.data.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setUsers([]);
            });
    };

    useEffect(() => {
        refreshInvitations();
    }, []);

    return (
        <div id="Validation" className="CentralBanner">
            <h2 style={{padding: '10px'}}>Il y a {users.length === 0 ? "aucune" : users.length} demande{users.length <= 1 ? "" : "s"} d'inscription !</h2>
            {users.map(user => (
                <Invitation key={user._id} user={props.user} userInvite={user} refresh={refreshInvitations} />
            ))}
        </div>
    );
}


export default Validation;