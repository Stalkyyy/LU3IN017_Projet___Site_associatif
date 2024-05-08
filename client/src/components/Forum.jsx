import { useState } from "react";
import MessageList from "./MessageList.jsx";
import MessageForm from "./MessageForm.jsx";
import '../css/FeedType.css';

function Forum(props) {
    // Garde en mémoire si le forum affiché est celui privé ou public.
    // De plus, refreshKey est un état permettant de rafraichir le composant MessageList.
    const [privateForum, setForum] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    function refreshForum() {
        setRefreshKey(oldKey => oldKey + 1);
    };


    
    return (
        <div id="Forum" className="CentralBanner">
            <div id="feedType">
                <button id="goPublicForum" className={!privateForum ? "forumSelected" : ""} onClick={() => setForum(false)}>Forum public</button>
                { props.user.status === "admin" ? <button id="goPrivateForum" className={privateForum ? "forumSelected" : ""} onClick={() => setForum(true)}>Forum privé</button> : <></> }
            </div>
            <div id="conteneurMessageForum">
                <MessageForm user={props.user} type={privateForum} refreshForum={refreshForum}/>
                <MessageList user={props.user} type={privateForum} key={refreshKey} visitProfile={props.visitProfile}/>
            </div>
        </div>
    )
}

export default Forum;