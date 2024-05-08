import { useState, useEffect } from "react";
import Invitation from "./Invitation.jsx";
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/Validation.css'


function Validation(props) {
    // Garde en mémoire la liste des utilisateurs en attente de validation.
    const [users, setUsers] = useState([]);



    // Gère la demande serveur pour récupérer la liste des utilisateurs en attente de validation.
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

    // Permet de faire la demande serveur lors de la création du composant.
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