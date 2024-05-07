import { useEffect, useState } from "react";
import '../css/Profile.css'
import '../css/FeedType.css'
import MessageList from "./MessageList.jsx";
import axios from 'axios';
import URL from '../Url.jsx';

function Profile(props) {
    const [privateForum, setForum] = useState(false);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        axios.get(`${URL()}/user/${props.userFocused}`)
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            })
    }, [props.userFocused]);


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
                </div>
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