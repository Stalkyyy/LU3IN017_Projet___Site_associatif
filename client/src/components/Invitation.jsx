import URL from '../Url.jsx';
import axios from 'axios';

function Invitation(props) {
    // Gère la demande serveur pour accepter en tant que membre, admin, ou rejeter un utilisateur en cours de validation.
    function clickHandler(e) {
        if (e.target.value === "refused")
            axios.delete(`${URL()}/user/delete/${props.userInvite._id}`)
                .then((response) => {
                    if (response.status === 200)
                        props.refresh();
                    else
                        console.log(response);
                })
                .catch(err => {
                    console.error(err);
                })

        else 
            axios.patch(`${URL()}/user/validation`, { status: e.target.value, userId: props.userInvite._id})
                .then((response) => {
                    if (response.status === 200)
                        props.refresh();
                    else
                        console.log(response);
                })
                .catch(err => {
                    console.error(err);
                })
    }


    
    return(
        <div className="Invitation">
            <div className='informations-Invitation'>
                <p>{props.userInvite.firstname} {props.userInvite.lastname}</p>
                <p>{props.userInvite.mail}</p>
            </div>
            <button id='memberButton' value={"member"} onClick={clickHandler}>Membre</button>
            <button id='adminButton' value={"admin"} onClick={clickHandler}>Admin</button>
            <button id='rejectButton' value={"refused"} onClick={clickHandler}>Rejeter</button>
        </div>
    )
}

export default Invitation