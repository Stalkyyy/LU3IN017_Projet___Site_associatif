import { useEffect, useState } from "react";
import MessageList from "./MessageList.jsx";
import URL from '../Url.jsx';
import axios from 'axios';
import '../css/Profile.css'
import '../css/FeedType.css'

function Profile(props) {
    // Garde en mémoire les informations de l'utilisateur du profil visité.
    // De plus, on a le type de forum, soit privé, soit public.
    // Enfin, refreshKey est un état permettant de rafraichir le composant actuel.
    const [userInfo, setUserInfo] = useState(null);
    const [privateForum, setForum] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);



    // Gère la demande serveur pour changer le statut de l'utilisateur en profil en membre ou admin.
    function handleClick(e) {
        axios.patch(`${URL()}/user/validation`, { status: userInfo.status === "member" ? "admin" : "member", userId: userInfo._id})
                .then((response) => {
                    if (response.status === 200)
                        setRefreshKey(refreshKey + 1);
                    else
                        console.log(response);
                })
                .catch(err => {
                    console.error(err);
                })
    }



    // Permet de faire une demande serveur pour récupérer les informations de l'utilisateur du profil, lors de la création du composant.
    useEffect(() => {
        axios.get(`${URL()}/user/${props.userFocused}`)
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            })
    }, [props.userFocused, refreshKey]);


    
    return (
        <div id="Profile" className="CentralBanner">
            <div id="Presentation_Profile">
                <img id="profilePic-Profile" src="/images/Celestine_sans_teinture.png" alt="profilePicture" />
                <div id="info-Profile">
                    <p id="TitleProfile">{userInfo && userInfo.firstname} {userInfo && userInfo.lastname}</p>
                    <p>{userInfo && userInfo.mail}</p>
                    <p>
                        A rejoint le {userInfo && 
                            new Date(userInfo.date).toLocaleDateString('fr-FT')
                        }
                    </p>
                    <p>Statut : {userInfo && userInfo.status}</p>
                </div>
                {(userInfo && userInfo._id !== props.user._id && props.user.status === "admin") ? <button id="profilChangeStatus" onClick={handleClick}>Transformer en {userInfo.status === "admin" ? "membre" : "admin"}</button> : <></>}
            </div>
            <div id="feedType">
                <button id="goPublicForum" className={!privateForum ? "forumSelected" : ""} onClick={() => setForum(false)}>Posts publics</button>
                { props.user.status === "admin" ? <button id="goPrivateForum" className={privateForum ? "forumSelected" : ""} onClick={() => setForum(true)}>Posts privés</button> : <></> }
            </div>

            <div id="conteneurMessageProfile">
                <MessageList user={props.user} type={privateForum} authorFocused={props.userFocused} />
            </div>
        </div>
    )
}

export default Profile;