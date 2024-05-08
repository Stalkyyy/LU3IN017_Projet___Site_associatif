import URL from '../Url.jsx';
import axios from 'axios';
import '../css/UserBanner.css'

function UserBanner(props) {
    // Ajoute le bouton permettant d'aller à la page de validation d'utilisateur en attente, SI nous sommes administrateur.
    function addValidationAdminButton() {
        if (props.isAdmin) 
            return <button onClick={() => {props.setHomeCBpage("validation")}}>Validation</button>
    }



    // Gère la demande serveur pour se déconnecter.
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
            <button onClick={() => {props.visitProfile(props.user._id)}}>Ton profil</button>

            <button onClick={() => {props.setHomeCBpage("forum")}}>Forum</button>
            <button onClick={() => {props.setHomeCBpage("search")}}>Recherche</button>
            {addValidationAdminButton()}

            <button id="logoutButton" onClick={handleSubmit}>Se déconnecter</button>
        </div>
    )
}

export default UserBanner;