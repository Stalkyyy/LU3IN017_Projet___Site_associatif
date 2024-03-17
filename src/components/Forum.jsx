import { useState, useEffect } from "react";
import MessageList from "./MessageList.jsx";
import '../css/Forum.css';

function Forum(props) {
    const [privateForum, setForum] = useState(false);

    return (
        <div id="Forum" className="CentralBanner">
            <div id="feedType">
                <button id="goPublicForum" className={!privateForum ? "forumSelected" : ""} onClick={() => setForum(false)}>Forum publique</button>
                { props.isAdmin ? <button id="goPrivateForum" className={privateForum ? "forumSelected" : ""} onClick={() => setForum(true)}>Forum privée</button> : <></> }
            </div>
            <MessageList />
        </div>
    )
}

export default Forum;