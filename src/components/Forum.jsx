import { useState } from "react";
import UserBanner from "./UserBanner.jsx";
import '../css/Forum.css'

function Forum(props) {
    const [privateForum, setForum] = useState(false);

    return (
        <div id="Forum">
            <div id="feedType">
                <button id="goPublicForum" onClick={() => setForum(false)}>Forum publique</button>
                { props.isAdmin ? <button id="goPrivateForum" onClick={() => setForum(true)}>Forum privée</button> : <></> }
            </div>
            <div id="feed">
                {privateForum ? <p>Forum privé !</p> : <p>Forum publique !</p>}
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
                <p>Mon profile !</p>
            </div>
        </div>
    )
}

export default Forum;