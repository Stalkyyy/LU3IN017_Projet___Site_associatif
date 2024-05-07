import { useState, useEffect } from "react";
import '../css/MessageForm.css'
import axios from 'axios';
import URL from '../Url.jsx';

function MessageForm(props) {
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ error, setError ] = useState("");

    function getTitle(event) {
        setTitle(event.target.value);
    }

    function getContent(event) {
        setContent(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.put(`${URL()}/message/create`, { idAuthor: props.user._id, title, content, forum: props.type ? "private" : "public" })
            .then(response => {
                setTitle("");
                setContent("");
                setError("Message envoyé !");
                props.refreshForum();
            })
            .catch(error => {
                setError("Une erreur s'est produite lors de l'envoi du message.");
            });
    }



    return (
        <form id="MessageForm" onSubmit={handleSubmit}>
            <label>Titre :</label>
            <input type="text" value={title} onChange={getTitle} required />
            <label>Contenu :</label>
            <textarea value={content} onChange={getContent} required />
            <p>{error}</p>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default MessageForm;